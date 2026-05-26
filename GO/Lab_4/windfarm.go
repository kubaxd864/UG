package main

import (
	"context"
)

func NewWindFarm(b *Broadcaster) *WindFarm {
	return &WindFarm{
		 sub: b.Subscribe(),
		 curtailed: false,
	}
}

func (w *WindFarm) Start(ctx context.Context) {
   for {
	   select {
	   case <-ctx.Done():
		   return

	   case data := <-w.sub:
		   if w.curtailed {
			   w.output = 0
		   } else {
			   if data.Wind > 0 {
				   w.output = data.Wind * 2
			   } else {
				   w.output = 0
			   }
		   }
	   }
   }
}
func (w *WindFarm) SetCurtailment(enable bool) {
	w.curtailed = enable
}

func (w *WindFarm) CurrentOutput() float64 {
	return w.output
}