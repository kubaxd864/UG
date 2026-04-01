package main

import (
	"fmt"
	"math"
	"math/rand"
	"sort"
)

type Uczestnik struct {
	Imie    string
	Utwory  []string
	Oceny   [][]int
}

func main() {
	etapKonkursu := 2
	repertuar := []string{"Etiuda Rewolucyjna", "Ballada g-moll", "Mazurek a-moll"}

	losoweOceny := func(liczbaUtworow int, liczbaJurorow int, minOcena int, maxOcena int) [][]int {
		oceny := make([][]int, liczbaUtworow)
		for i := 0; i < liczbaUtworow; i++ {
			oceny[i] = make([]int, liczbaJurorow)
			for j := 0; j < liczbaJurorow; j++ {
				oceny[i][j] = rand.Intn(maxOcena-minOcena+1) + minOcena
			}
		}
		return oceny
	}

	uczestnicy := []Uczestnik{
		{
			Imie:   "Anna Kowalska",
			Utwory: repertuar,
			Oceny:  losoweOceny(len(repertuar), 5, 1, 25),
		},
		{
			Imie:   "Jan Nowak",
			Utwory: repertuar,
			Oceny:  losoweOceny(len(repertuar), 5, 1, 25),
		},
		{
			Imie:   "Maria Wiśniewska",
			Utwory: repertuar,
			Oceny:  losoweOceny(len(repertuar), 5, 1, 25),
		},
	}

	sredniaOcen := func(uczestnik Uczestnik) float64 {
		suma := 0
		licznik := 0
		for _, utwor := range uczestnik.Oceny {
			for _, ocena := range utwor {
				suma += ocena
				licznik++
			}
		}
		return float64(suma) / float64(licznik)
	}

	korygujOceny := func(uczestnik Uczestnik, etap int) [][]int {
		prog := 2.0
		if etap == 1 {
			prog = 3.0
		}

		srednia := sredniaOcen(uczestnik)
		dolnaGranica := srednia - prog
		gornaGranica := srednia + prog

		skorygowane := make([][]int, len(uczestnik.Oceny))
		for i, utwor := range uczestnik.Oceny {
			skorygowane[i] = make([]int, len(utwor))
			for j, ocena := range utwor {
				wartosc := float64(ocena)
				if wartosc > gornaGranica {
					wartosc = gornaGranica
				} else if wartosc < dolnaGranica {
					wartosc = dolnaGranica
				}
				skorygowane[i][j] = int(math.Round(wartosc))
			}
		}

		return skorygowane
	}

	sredniaZaUtwor := func(uczestnik Uczestnik, indeksUtworu int) float64 {
		suma := 0
		for _, ocena := range uczestnik.Oceny[indeksUtworu] {
			suma += ocena
		}
		return float64(suma) / float64(len(uczestnik.Oceny[indeksUtworu]))
	}

	najlepszyZaUtwor := func(utworIndex int) (string, float64) {
		najlepszy := ""
		najwyzsza := -1.0
		
		for _, u := range uczestnicy {
			srednia := sredniaZaUtwor(u, utworIndex)
			if srednia > najwyzsza {
				najwyzsza = srednia
				najlepszy = u.Imie
			}
		}
		return najlepszy, najwyzsza
	}

	fmt.Println("\nREPERTUAR I OCENY UCZESTNIKÓW:")

	for _, u := range uczestnicy {
		fmt.Printf("%s\n", u.Imie)
		for i, utwor := range u.Utwory {
			fmt.Printf(" %s: %v\n", utwor, u.Oceny[i])
		}
	}

	fmt.Println("\nWYNIKI KOŃCOWE:")
	type Wynik struct {
		Imie     string
		Srednia  float64
	}
	
	wyniki := []Wynik{}
	for _, u := range uczestnicy {
		skorygowaneOceny := korygujOceny(u, etapKonkursu)
		uSkorygowany := Uczestnik{
			Imie:   u.Imie,
			Utwory: u.Utwory,
			Oceny:  skorygowaneOceny,
		}
		wyniki = append(wyniki, Wynik{
			Imie:      u.Imie,
			Srednia:   sredniaOcen(uSkorygowany),
		})
	}

	sort.Slice(wyniki, func(i, j int) bool {
		return wyniki[i].Srednia > wyniki[j].Srednia
	})
	
	for i, w := range wyniki {
		fmt.Printf("%d. %-20s Średnia: %.2f\n", 
			i+1, w.Imie, w.Srednia)
	}
	
	fmt.Println("\nNAJWYŻSZE OCENY ZA KONKRETNE UTWORY:")
	
	for i, utwor := range repertuar {
		najlepszy, srednia := najlepszyZaUtwor(i)
		fmt.Print(utwor, ": ")
		fmt.Printf("%s - %.2f pkt\n", najlepszy, srednia)
	}
}