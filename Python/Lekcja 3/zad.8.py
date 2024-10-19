n = int(input("Podaj liczbę n: "))
wynik = [1]
licznik = 0
while sum(wynik[:]) + (wynik[licznik] + 1) < n:
    wynik.append(wynik[licznik] + 1)
    licznik += 1
print("Liczba m jest równa:", n - sum(wynik[:]))