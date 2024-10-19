n = input("Podaj liczbę w systemie binarnym: ")
p = len(n) - 1
wynik = 0

while p >= 0:
    if n[p] == '1':
        wynik += 2**(len(n) - 1 - p)
    p -= 1

print(wynik)