package main

func NewESS(capacity float64) *ESS {
	return &ESS{capacity: capacity, soc: 0.5 * capacity, currentDischargePower: 0}
}

func (e *ESS) Charge(amount float64) {
	if amount < 0 {
		return
	}
	e.soc += amount
	if e.soc > e.capacity {
		e.soc = e.capacity
	}
	e.currentDischargePower = 0
}

func (e *ESS) Discharge(amount float64) float64 {
	if amount < 0 {
		return 0
	}
	if amount > e.soc {
		out := e.soc
		e.soc = 0
		e.currentDischargePower = out
		return out
	}
	e.soc -= amount
	e.currentDischargePower = amount
	return amount
}

func (e *ESS) GetSoC() float64 {
	return e.soc / e.capacity
}

func (e *ESS) GetMaxDischargePower() float64 {
	return e.soc
}

func (e *ESS) GetAvailableCapacity() float64 {
	return e.capacity - e.soc
}