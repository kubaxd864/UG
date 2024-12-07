suma = 0
while True:
    number = int(input("Podaj liczbę: "))
    if number % 2 == 0:
        suma += number
    else:
        break

print("Wynik: ", suma)