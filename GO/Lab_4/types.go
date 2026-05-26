package main

import (
	"sync"
	"time"
)

type ESS struct {
	capacity              float64
	soc                   float64
	currentDischargePower float64
}

type LoadShedRecord struct {
	ConsumerID string
	Priority   int
	DemandMW   float64
	Timestamp  time.Time
}

type DemandReport struct {
	ID       string
	DemandMW float64
	Priority int
	ReplyCh  chan SupplyStatus
}

type SupplyStatus struct {
	AllocatedMW float64
	Reason      string
}

type ForecastReport struct {
	PredictedRES float64
	Trend        float64
}

type WeatherData struct {
	Wind float64
}

type WindFarm struct {
	output float64
	sub    chan WeatherData
	curtailed bool
}

type CoalPlant struct {
	mu     sync.RWMutex
	output float64
	target float64
}