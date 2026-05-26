package main

import (
	"context"
	"fmt"
	"sort"
	"time"
)

func getGridState(balance float64) string {
	if balance >= 0 {
		return "Stable"
	}
	return "Critical"
}

func StartGridHub(
	ctx context.Context,
	forecastChan <-chan ForecastReport,
	demandChan <-chan DemandReport,
	logChan chan<- any,
	sources []EnergySource,
	ess *ESS,
	coal *CoalPlant,
	wind *WindFarm,
) {
	ticker := time.NewTicker(GridStep)
	defer ticker.Stop()

	consumers := make(map[string]DemandReport)
	sheddedConsumers := make(map[string]bool)
	loadShedHistory := []LoadShedRecord{}
	step := 0
	var currentDemand float64
	var forecast ForecastReport
	forecastReceived := false
	wasCurtailed := false

	getSupply := func() (total, wind, coal float64) {
		for _, src := range sources {
			out := src.CurrentOutput()
			total += out
			switch src.(type) {
			case *WindFarm:
				wind = out
			case *CoalPlant:
				coal = out
			}
		}
		return
	}

	for {
		select {
		case <-ctx.Done():
			return

		case d := <-demandChan:
			consumers[d.ID] = d
			delete(sheddedConsumers, d.ID)
			currentDemand += d.DemandMW
			logChan <- fmt.Sprintf("[Demand] %s: %.2f MW (Priorytet: %d)", d.ID, d.DemandMW, d.Priority)

		case f := <-forecastChan:
			forecast = f
			forecastReceived = true
			logChan <- fmt.Sprintf("[Forecast] Aktualizacja pogody: Wiatr %.1f km/h", f.Trend)

		case <-ticker.C:
			if !forecastReceived {
				logChan <- "[GridHub] Oczekiwanie na dane pogodowe..."
				continue
			}
			step++
			currentSupply, windOutput, coalOutput := getSupply()
			logChan <- fmt.Sprintf("[GridHub] TICK %d | MOC: %.2f (Wiatr: %.2f, Węgiel: %.2f) | ZAPOTRZEBOWANIE: %.2f | BATERIA: %.2f",
				step, currentSupply, windOutput, coalOutput, currentDemand, ess.GetSoC())

			if forecast.Trend > 25.0 && wasCurtailed {
				wind.SetCurtailment(false)
				wasCurtailed = false
			}
			balance := currentSupply - currentDemand
			soc := ess.GetSoC()

			if balance < 0 {
				deficit := -balance
				coal.TriggerStart(deficit + 10.0)
				logChan <- fmt.Sprintf("[Węgiel] Uruchomiono Elektronię z mocą: %.2f MW", deficit + 10.0)
				currentSupply, windOutput, coalOutput = getSupply()
				balance = currentSupply - currentDemand
			}

			if balance > 0 {
				if soc < 1.0 {
					charge := min(balance, ess.GetAvailableCapacity())
					ess.Charge(charge)
					logChan <- fmt.Sprintf("[ESS] Ładowanie: %.2f MW | Nowy Stan Baterii: %.2f%%", 
						charge, ess.GetSoC()*100)
					balance -= charge
				}
			
				if balance > 0.01 && !wasCurtailed {
					wind.SetCurtailment(true)
					wasCurtailed = true
					logChan <- fmt.Sprintf("[Wiatr] OGRANICZANIE PRODUKCJI OZE - nadwyżka: %.2f MW", balance)
				} else if balance <= 0.01 && wasCurtailed {
					wind.SetCurtailment(false)
					wasCurtailed = false
					logChan <- "[Wiatr] Przywrócono pełną produkcję OZE"
				}
			}

			if balance < 0 && soc > 0.01 {
				needed := min(-balance, ess.GetMaxDischargePower())
				recovered := ess.Discharge(needed)
				balance += recovered
				logChan <- fmt.Sprintf("[ESS] Rozładowanie: %.2f MW | Stan Baterii: %.2f%%",
					recovered, ess.GetSoC()*100)
				
				if wasCurtailed && recovered > 0 {
					wind.SetCurtailment(false)
					wasCurtailed = false
					logChan <- "[Wiatr] Przywrócono pełną produkcję"
				}
			}

			currentSupply, _, _ = getSupply()
			deficit := currentDemand - currentSupply
			
			if deficit > 0.01 {
				logChan <- fmt.Sprintf("[LoadShed] Wymagane odłączenie: %.2f MW (Supply: %.2f, Demand: %.2f)",
					deficit, currentSupply, currentDemand)
				var connected []DemandReport
				for id, c := range consumers {
					if !sheddedConsumers[id] {
						connected = append(connected, c)
					}
				}
				sort.Slice(connected, func(i, j int) bool {
					return connected[i].Priority > connected[j].Priority
				})
				remaining := deficit
				for _, c := range connected {
					if remaining <= 0.01 {
						break
					}
					sheddedConsumers[c.ID] = true
					remaining -= c.DemandMW
					
					loadShedHistory = append(loadShedHistory, LoadShedRecord{
						ConsumerID: c.ID,
						Priority:   c.Priority,
						DemandMW:   c.DemandMW,
						Timestamp:  time.Now(),
					})
					
					logChan <- fmt.Sprintf("Odłączono %s (priorytet %d) | Pozostały deficyt: %.2f MW",
						c.ID, c.Priority, max(0, remaining))
				}
				
				if remaining > 0.01 {
					logChan <- fmt.Sprintf("[LoadShed] Pozostały deficyt: %.2f MW", remaining)
				} else {
					logChan <- "[LoadShed] Bilans osiągnięty pomyślnie"
				}
			} else if deficit > -0.01 {
				logChan <- fmt.Sprintf("[GridHub] Bilans dodatni: %.2f MW - wyłączono load shedding", balance)
			}
			for id, c := range consumers {
				status := SupplyStatus{AllocatedMW: c.DemandMW}
				if sheddedConsumers[id] {
					status.AllocatedMW, status.Reason = 0, "LoadShed"
				}
				c.ReplyCh <- status
			}

			if step%WeatherPerGrid == 0 {
				shedStats := make(map[int]int)
				for _, record := range loadShedHistory {
					shedStats[record.Priority]++
				}
				
				currentLoad := 0.0
				for id, c := range consumers {
					if !sheddedConsumers[id] {
						currentLoad += c.DemandMW
					}
				}
				fmt.Printf(
					"[Pogoda] Wiatr: %.1f km/h\n"+
					"[Produkcja] OZE: %.2f MW | Konwencjonalna: %.2f MW | Baterie: %.2f%%\n"+
					"[Sieć] Popyt: %.2f MW | Obciążenie: %.2f MW | Stan: %s \n\n\n",
					forecast.Trend,
					wind.CurrentOutput(), coal.CurrentOutput(), ess.GetSoC()*100,
					currentDemand, currentLoad, getGridState(balance),
				)
			}
			currentDemand = 0
		}
	}
}