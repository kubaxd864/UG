package main

import (
	"context"
	"math/rand"
	"time"
)

func StartWeatherStation(ctx context.Context, b *Broadcaster) {
	ticker := time.NewTicker(WeatherStep)
	prev_wind := 10.0
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return

		case <-ticker.C:
			windSpeed := prev_wind + (-1 + rand.Float64()*2)
			prev_wind = windSpeed
			if windSpeed < 0 {
				windSpeed = 0
			}
			if windSpeed > 120 {
				windSpeed = 120
			}
			data := WeatherData{Wind: windSpeed}
			   select {
			   case <-ctx.Done():
				   return
			   default:
				   b.Broadcast(data)
			   }
		}
	}
}

