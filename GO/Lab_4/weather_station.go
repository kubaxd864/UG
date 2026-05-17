package main

import (
	"context"
	"time"
)

func StartWeatherStation(ctx context.Context, b *Broadcaster) {
    ticker := time.NewTicker(500 * time.Millisecond)

    for {
        select {
        case <-ctx.Done():
            return
        case <-ticker.C:
            data := WeatherData{WindSpeed: 10}
            b.Broadcast(data)
        }
    }
}