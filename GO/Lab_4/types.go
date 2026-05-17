package main

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
	ExpectedChange float64
	Horizon        int
}

type WeatherData struct {
	WindSpeed float64
	SunLevel  float64
}