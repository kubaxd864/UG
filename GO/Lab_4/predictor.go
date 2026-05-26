package main

import (
	"context"
	"time"
)

func StartPredictor(
	ctx context.Context,
	b *Broadcaster,
	forecastChan chan<- ForecastReport,
) {
	sub := b.Subscribe()

	buffer := make([]float64, 0, WeatherPerGrid)
	ticker := time.NewTicker(GridStep)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return

		   case w := <-sub:
			   buffer = append(buffer, w.Wind)
			   if len(buffer) > WeatherPerGrid {
				   buffer = buffer[1:]
			   }

		   case <-ticker.C:
			   if len(buffer) < WeatherPerGrid {
				   continue
			   }
			   base := buffer[0]
			   last := buffer[len(buffer)-1]
			   var trendPercent float64
			   if base != 0 {
				   trendPercent = 100 * (last - base) / base
			   } else {
				   trendPercent = 0
			   }
			   forecast := ForecastReport{
				   PredictedRES: last,
				   Trend:        trendPercent,
			   }  
			   select {
			   case forecastChan <- forecast:
			   case <-ctx.Done():
				   return
			   }
		}
	}
}