package main

import (
	"context"
	"time"
)

type ConsumerType int

const (
   Residential ConsumerType = iota 
   Industrial                      
   Critical                        
)

func (ct ConsumerType) Priority() int {
   switch ct {
   case Residential:
	   return 3
   case Industrial:
	   return 2
   case Critical:
	   return 1
   default:
	   return 3
   }
}

func (ct ConsumerType) String() string {
   	switch ct {
   	case Residential:
		return "Residential"
   	case Industrial:
		return "Industrial"
   	case Critical:
		return "Critical"
   	default:
		return "Unknown"
   }
}

func GenerateDemand(typ ConsumerType, t int) float64 {
   switch typ {
   case Residential:
	   hour := t % 24
	   base := 10.0
	   if (hour >= 7 && hour <= 9) || (hour >= 18 && hour <= 22) {
		   return base + 30.0 
	   }
	   return base
   case Industrial:
	   hour := t % 24
	   if hour >= 6 && hour < 18 {
		   return 40.0 + 10.0*(float64(hour-6)/12.0)
	   }
	   return 10.0
   case Critical:
	   return 20.0
   default:
	   return 0
   }
}

func StartConsumer(ctx context.Context, id string, typ ConsumerType, demandChan chan<- DemandReport) {
	ticker := time.NewTicker(GridStep)
	defer ticker.Stop()
	replyCh := make(chan SupplyStatus)
	t := 0
	for {
		demand := GenerateDemand(typ, t)
		t++
		demandChan <- DemandReport{
			ID:       id,
			DemandMW: demand,
			Priority: typ.Priority(),
			ReplyCh:  replyCh,
		}
		select {
			case <-replyCh:
			case <-ctx.Done():
				return
		}
	}
}