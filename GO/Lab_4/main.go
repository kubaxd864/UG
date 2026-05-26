package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"sync"
	"syscall"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)

	go func() {
		<-sigChan
		fmt.Println("\n[SYSTEM] Shutdown")
		cancel()
	}()

	forecastChan := make(chan ForecastReport, 1)
	demandChan := make(chan DemandReport)
	logChan := make(chan any, 100)

	broadcaster := NewBroadcaster()
	wind := NewWindFarm(broadcaster)
	coal := &CoalPlant{}
	sources := []EnergySource{wind, coal}
	ess := NewESS(100)

	var wg sync.WaitGroup
		go StartLogger(logChan)

	wg.Add(2)
	go func() { defer wg.Done(); wind.Start(ctx) }()
	go func() { defer wg.Done(); coal.Start(ctx) }()

	wg.Add(3)
	go func() { defer wg.Done(); StartWeatherStation(ctx, broadcaster) }()
	go func() { defer wg.Done(); StartPredictor(ctx, broadcaster, forecastChan) }()
	go func() {
		defer wg.Done()
		StartGridHub(ctx, forecastChan, demandChan, logChan, sources, ess, coal, wind)
	}()

	consumerDefs := []struct {
		id  string
		typ ConsumerType
	}{
		{"H1", Residential},
		{"H2", Residential},
		{"F1", Industrial},
		{"F2", Industrial},
		{"HOSPITAL", Critical},
	}

	for _, def := range consumerDefs {
		wg.Add(1)
		go func(id string, typ ConsumerType) {
			defer wg.Done()
			StartConsumer(ctx, id, typ, demandChan)
		}(def.id, def.typ)
	}

	wg.Wait()
	close(logChan)
	fmt.Println("[SYSTEM] Zamknięto")
}