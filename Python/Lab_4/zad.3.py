rozmiar = int(input("Podaj rozmiar: "))
for i in range(rozmiar):
    print(" " * (rozmiar - i - 1) + "*" * (i + 1))