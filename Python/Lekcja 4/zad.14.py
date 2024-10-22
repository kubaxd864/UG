a = int(input("Podaj Pierwszą Liczbę: "))
b = int(input("Podaj Drugą Liczbę: "))
while a != b:
    if a > b:
        a -= b
    else:
        b -= a

print("Największy wspólny dzielnik to:", a)