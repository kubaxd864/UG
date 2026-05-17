package main

import (
	"context"
	"fmt"
	"time"
)

func StartConsumer(ctx context.Context, id string, demandChan chan<- DemandReport) {
    for {
        select {
        case <-ctx.Done():
            return
        default:
            replyCh := make(chan SupplyStatus)

            demandChan <- DemandReport{
                ID:       id,
                DemandMW: 100,
                Priority: 1,
                ReplyCh:  replyCh,
            }

            resp := <-replyCh
            fmt.Println("Consumer", id, resp)

            time.Sleep(1 * time.Second)
        }
    }
}