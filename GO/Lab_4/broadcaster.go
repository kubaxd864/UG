package main

type Broadcaster struct {
	subscribers []chan WeatherData
}

func NewBroadcaster() *Broadcaster {
	return &Broadcaster{}
}

func (b *Broadcaster) Subscribe() chan WeatherData {
	ch := make(chan WeatherData, 1)
	b.subscribers = append(b.subscribers, ch)
	return ch
}

func (b *Broadcaster) Broadcast(data WeatherData) {
	for _, ch := range b.subscribers {
		select {
		case ch <- data:
		default:
		}
	}
}