package main

import (
	"fmt"
	"time"
)

type Aircraft struct {
	ID    int
	Model string
	Seats int
}

type Passenger struct {
	ID   int
	Name string
}

type Flight struct {
	ID       int
	From     string
	To       string
	When     time.Time
	Aircraft *Aircraft
}

func (f Flight) String() string {
	return fmt.Sprintf("Flight %d: %s -> %s at %s (%s, %d seats)",
		f.ID, f.From, f.To, f.When.Format("2006-01-02 15:04"), f.Aircraft.Model, f.Aircraft.Seats)
}

type Reservation struct {
	ID         int
	Passenger  *Passenger
	Flight     *Flight
	ReservedAt time.Time
}

type FlightMatcher interface {
	Match(*Flight) bool
}

type ReservationMatcher interface {
	Match(*Reservation) bool
}

func FilterFlights(flights []*Flight, m FlightMatcher) []*Flight {
	result := make([]*Flight, 0)
	for _, f := range flights {
		if m.Match(f) {
			result = append(result, f)
		}
	}
	return result
}

func FilterReservations(reservations []*Reservation, m ReservationMatcher) []*Reservation {
	result := make([]*Reservation, 0)
	for _, r := range reservations {
		if m.Match(r) {
			result = append(result, r)
		}
	}
	return result
}

type FromAirport struct{ Airport string }

func (m FromAirport) Match(f *Flight) bool { return f.From == m.Airport }

type ToAirport struct{ Airport string }

func (m ToAirport) Match(f *Flight) bool { return f.To == m.Airport }

type ByPassenger struct{ PassengerID int }

func (m ByPassenger) Match(r *Reservation) bool { return r.Passenger.ID == m.PassengerID }

type System struct {
	Flights      []*Flight
	Reservations []*Reservation
	nextResID    int
}

func NewSystem() *System {
	return &System{nextResID: 1}
}

func (s *System) AddFlight(f *Flight) {
	s.Flights = append(s.Flights, f)
}

func (s *System) AvailableSeats(f *Flight) int {
	reserved := 0
	for _, r := range s.Reservations {
		if r.Flight.ID == f.ID {
			reserved++
		}
	}
	return f.Aircraft.Seats - reserved
}

func (s *System) Reserve(p *Passenger, f *Flight) (*Reservation, error) {
	if s.AvailableSeats(f) <= 0 {
		return nil, fmt.Errorf("no available seats on flight %d", f.ID)
	}
	for _, r := range s.Reservations {
		if r.Passenger.ID == p.ID && r.Flight.ID == f.ID {
			return nil, fmt.Errorf("passenger %s already has a reservation on flight %d", p.Name, f.ID)
		}
	}

	r := &Reservation{
		ID:         s.nextResID,
		Passenger:  p,
		Flight:     f,
		ReservedAt: time.Now(),
	}
	s.Reservations = append(s.Reservations, r)
	s.nextResID++
	return r, nil
}

func (s *System) CancelReservation(reservationID int) error {
	for i, r := range s.Reservations {
		if r.ID == reservationID {
			s.Reservations = append(s.Reservations[:i], s.Reservations[i+1:]...)
			return nil
		}
	}
	return fmt.Errorf("reservation %d not found", reservationID)
}

func (s *System) ReservationsByPassenger(passengerID int) []*Reservation {
	return FilterReservations(s.Reservations, ByPassenger{PassengerID: passengerID})
}

func (s *System) FlightsFrom(airport string) []*Flight {
	return FilterFlights(s.Flights, FromAirport{Airport: airport})
}

func (s *System) FlightsTo(airport string) []*Flight {
	return FilterFlights(s.Flights, ToAirport{Airport: airport})
}

func main() {
	system := NewSystem()

	airbus := &Aircraft{ID: 1, Model: "Airbus A320", Seats: 180}
	boeing := &Aircraft{ID: 2, Model: "Boeing 737", Seats: 162}

	flight1 := &Flight{ID: 1, From: "WAW", To: "NYC", When: time.Now().AddDate(0, 0, 5), Aircraft: airbus}
	flight2 := &Flight{ID: 2, From: "WAW", To: "PAR", When: time.Now().AddDate(0, 0, 3), Aircraft: boeing}
	flight3 := &Flight{ID: 3, From: "PAR", To: "NYC", When: time.Now().AddDate(0, 0, 7), Aircraft: airbus}

	system.AddFlight(flight1)
	system.AddFlight(flight2)
	system.AddFlight(flight3)

	passengers := []*Passenger{
		{ID: 101, Name: "Anna Kowalska"},
		{ID: 102, Name: "Jan Nowak"},
		{ID: 103, Name: "Maria Lewandowska"},
	}
	passenger1 := passengers[0]
	passenger2 := passengers[1]

	fmt.Println("Flight Reservation System")

	fmt.Println("\nAvaliable Flights")
	for _, f := range system.Flights {
		fmt.Printf("%s\n", f)
		fmt.Printf("Available seats: %d\n\n", system.AvailableSeats(f))
	}

	fmt.Println("Reservations")
	res1, err := system.Reserve(passenger1, flight1)
	if err != nil {
		fmt.Printf("Reserve failed: %v\n", err)
	}
	_, _ = system.Reserve(passenger2, flight1)
	_, _ = system.Reserve(passenger1, flight2)
	_, err = system.Reserve(passenger1, flight1)
	if err != nil {
		fmt.Printf("Duplicate blocked: %v\n", err)
	}

	fmt.Println("\nReservations by passenger")
	for _, p := range passengers {
		reservations := system.ReservationsByPassenger(p.ID)
		fmt.Printf("%s has %d reservation(s)\n", p.Name, len(reservations))
		for _, r := range reservations {
			fmt.Printf("  - %s -> %s\n", r.Flight.From, r.Flight.To)
		}
	}

	fmt.Println("\nFlights from WAW")
	for _, f := range system.FlightsFrom("WAW") {
		fmt.Printf("%s\n", f)
	}

	fmt.Println("\nFlights to NYC")
	for _, f := range system.FlightsTo("NYC") {
		fmt.Printf("%s\n", f)
	}

	fmt.Println("\nCancel reservation")
	fmt.Printf("Avaliable Seats: %d\n", system.AvailableSeats(flight1))
	_ = system.CancelReservation(res1.ID)
	fmt.Printf("Avaliable Seats: %d\n", system.AvailableSeats(flight1))
}