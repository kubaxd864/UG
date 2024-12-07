suma = 0
n = int(input("Podaj liczbę n: "))
for i in range(2, n + 2):
    suma += i - 1
    print(f"Suma poprzedników dla {i}: {suma}")
