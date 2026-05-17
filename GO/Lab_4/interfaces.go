package main

import "context"

type EnergySource interface {
	Start(ctx context.Context)
	CurrentOutput() float64
}

type Predictor interface {
	Start(ctx context.Context)
}

type Consumer interface {
	Start(ctx context.Context)
	GetID() string
}

type EnergyStorage interface {
	Charge(amount float64)
	Discharge(amount float64) float64
	GetSoC() float64
}

type WeatherProvider interface {
	Start(ctx context.Context)
}

type DataLogger interface {
	Start(ctx context.Context)
	Log(data any)
}