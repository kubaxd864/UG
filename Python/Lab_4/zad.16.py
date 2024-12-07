n = int(input("Podaj liczbę n: "))
a = 1
b = 1
false = False
for i in range(n):
    for j in range(n):
        if n == a ** 2 + b ** 2:
            print("TAK")
            false = True
            break
        b += 1
    a += 1
    b = 1
    if false:
        break
    else:
        print("NIE")
        break