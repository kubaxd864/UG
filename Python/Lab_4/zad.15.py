m = int(input("Podaj liczbę wierszy: "))
n = int(input("Podaj liczbę kolumn: "))

for i in range(1, m + 1):
    for j in range(1, n + 1):
        print(f"{i * j:4}", end=" ")
    print()