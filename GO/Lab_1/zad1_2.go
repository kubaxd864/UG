package main

import (
	"fmt"
	"math/rand"
)

func main() {
	var wygrane_1, wygrane_2, drzwi_nagroda, drzwi_gracza int
	const ilosc_gier = 100
	const N = 5
	const k = 3

	for i := 1; i <= ilosc_gier; i++ {
		drzwi_nagroda = rand.Intn(N)
		drzwi_gracza = rand.Intn(N)
		if drzwi_nagroda == drzwi_gracza  {
			wygrane_1++
		}
	}

	for i := 1; i <= ilosc_gier; i++ {
		drzwi_nagroda = rand.Intn(N)
		drzwi_gracza = rand.Intn(N)
		otwarte := make([]bool, N)
		otwarte_ile := 0
		for otwarte_ile < k {
			drzwi_otwarte := rand.Intn(N)
			if drzwi_otwarte != drzwi_gracza && drzwi_otwarte != drzwi_nagroda && !otwarte[drzwi_otwarte] {
				otwarte[drzwi_otwarte] = true
				otwarte_ile++
			}
		}
		for {
			nowy_wybor := rand.Intn(N)
			if nowy_wybor != drzwi_gracza && !otwarte[nowy_wybor] {
				drzwi_gracza = nowy_wybor
				break
			}
		}
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
