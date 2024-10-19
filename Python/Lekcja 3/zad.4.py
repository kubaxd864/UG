n = int(input("Podaj liczbę n: "))
licznik = 0
wynik = 0
while licznik < n:
    wynik += licznik**2
    licznik += 1
print(wynik)