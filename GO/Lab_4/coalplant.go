package main

import (
	"context"
	"time"
)

func (c *CoalPlant) Start(ctx context.Context) {
	ticker := time.NewTicker(GridStep)
	defer ticker.Stop()

    for {
        select {
        case <-ctx.Done():
            return
        case <-ticker.C:
            c.mu.Lock()
            if c.output < c.target {
                c.output += 10
                if c.output > c.target {
                    c.output = c.target
                }
            } else if c.output > c.target {
                c.output -= 10
                if c.output < c.target {
                    c.output = c.target
                }
            }
            c.mu.Unlock()
        }
    }
}

func (c *CoalPlant) CurrentOutput() float64 {
	c.mu.RLock()
	defer c.mu.RUnlock()
	return c.output
}

func (c *CoalPlant) TriggerStart(power float64) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.target = power
}

func (c * CoalPlant) SetCurtailment(enable bool) {}