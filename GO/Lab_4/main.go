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
		fmt.Println("\n[SYSTEM] Otrzymano sygnał przerwania. Zamykanie...")
		cancel()
	}()

	forecastChan := make(chan ForecastReport, 1)
	demandChan := make(chan DemandReport)
	logChan := make(chan any, 100)
	broadcaster := NewBroadcaster()

	var wg sync.WaitGroup
	wg.Add(5)

	go func() {
		defer wg.Done()
		StartWeatherStation(ctx, broadcaster)
	}()

	go func() {
		defer wg.Done()
		StartPredictor(ctx, broadcaster, forecastChan)
	}()

	go func() {
		defer wg.Done()
		StartGridHub(ctx, forecastChan, demandChan, logChan)
	}()

	go func() {
		defer wg.Done()
		StartConsumer(ctx, "C1", demandChan)
	}()

	wg.Wait()
	fmt.Println("[SYSTEM] Wszystkie komponenty zamknięte. Koniec.")
}