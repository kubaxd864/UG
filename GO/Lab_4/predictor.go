package main

import "context"

func StartPredictor(ctx context.Context, b *Broadcaster, forecastChan chan<- ForecastReport) {
    weatherCh := b.Subscribe()

    for {
        select {
        case <-ctx.Done():
            return
        case w := <-weatherCh:
            _ = w 

            forecastChan <- ForecastReport{
                ExpectedChange: 0.1,
                Horizon:        1,
            }
        }
    }
}