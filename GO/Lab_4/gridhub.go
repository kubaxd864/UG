package main

import (
	"context"
)

func StartGridHub(
    ctx context.Context,
    forecastChan <-chan ForecastReport,
    demandChan <-chan DemandReport,
    logChan chan<- any,
) {
    for {
        select {
        case <-ctx.Done():
            return

        case d := <-demandChan:
            d.ReplyCh <- SupplyStatus{
                AllocatedMW: d.DemandMW,
            }

        case f := <-forecastChan:
            logChan <- f
        }
    }
}