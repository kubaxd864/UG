n = int(input("Podaj liczbę n: "))
wynik = 1
for i in range(n):
    wynik = wynik * (i + 1)
print(wynik)