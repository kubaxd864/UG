package main

import (
	"fmt"
	"math/rand"
)

func main_2() {
	var wygrane_1, wygrane_2, drzwi_nagroda, drzwi_gracza int
	const ilosc_gier = 100
	for i := 1; i <= ilosc_gier; i++ {
		drzwi_nagroda = rand.Intn(3)
		drzwi_gracza = rand.Intn(3)
		if drzwi_nagroda == drzwi_gracza  {
			wygrane_1++
		}
	}

	for i := 1; i <= ilosc_gier; i++ {
		drzwi_nagroda = rand.Intn(3)
		drzwi_gracza = rand.Intn(3)
		var drzwi_otwarte int
		if drzwi_nagroda == drzwi_gracza {
			if rand.Intn(2) == 0 {
				drzwi_otwarte = (drzwi_gracza + 1) % 3
			} else {
				drzwi_otwarte = (drzwi_gracza + 2) % 3
			}
		} else {
			drzwi_otwarte = 3 - drzwi_gracza - drzwi_nagroda
		}
		drzwi_gracza = 3 - drzwi_gracza - drzwi_otwarte
		if drzwi_nagroda == drzwi_gracza {
			wygrane_2++
		}
	}

	if wygrane_1 > wygrane_2 {
		fmt.Println("Wygrywa Gracz 1 który wygrał grę ilością:", wygrane_1, "wygranych co stanowi:", (float64(wygrane_1) / float64(ilosc_gier) * 100), "%")
		fmt.Println("Wygrywa Gracz 2 który przegrał grę ilością:", wygrane_2, "wygranych co stanowi:", (float64(wygrane_2) / float64(ilosc_gier) * 100), "%")
	} else {
		fmt.Println("Wygrywa Gracz 2 który wygrał grę ilością:", wygrane_2, "wygranych co stanowi:", (float64(wygrane_2) / float64(ilosc_gier) * 100), "%")
		fmt.Println("Wygrywa Gracz 1 który przegrał grę ilością:", wygrane_1, "wygranych co stanowi:", (float64(wygrane_1) / float64(ilosc_gier) * 100), "%")
	}
}
