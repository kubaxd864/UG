package main

import "time"

const (
	GridStep    = 60 * time.Millisecond
	WeatherStep = 5 * time.Millisecond
	WeatherPerGrid = int(GridStep / WeatherStep)
)