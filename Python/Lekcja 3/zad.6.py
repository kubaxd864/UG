n = int(input("Podaj liczbę n: "))
licznik = 1
l_dzielników = 0
while licznik <= n:
    if n % licznik == 0:
        l_dzielników +=1
    licznik += 1
print(l_dzielników)