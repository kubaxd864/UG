n = int(input("Podaj szerokość prostokąta: "))
m = int(input("Podaj wysokość prostokąta: "))
for i in range(m):
    if i == 0 or i == m - 1:
        print("*" * n)
    else:
        print("*" + " " * (n - 2) + "*")