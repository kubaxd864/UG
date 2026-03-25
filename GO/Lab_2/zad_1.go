package main

import "fmt"

type Uczestnicy struct {
	Imie   string
	Utwory []string
	Oceny  []int
}

func main() {
	// var liczba_uczestnikow = 3
	// var liczba_sedziow = 5
	repertuar := []string{"etiuda", "ballada", "nokturn", "sonata"}
	uczestnicy := []Uczestnicy{
		{Imie: "Jan", Utwory: repertuar, Oceny: make([]int, 4)},
		{Imie: "Anna", Utwory: repertuar, Oceny: make([]int, 4)},
		{Imie: "Marcin", Utwory: repertuar, Oceny: make([]int, 4)},
	}

	fmt.Println("Uczestnicy: ", uczestnicy)
}