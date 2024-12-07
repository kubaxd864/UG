import math

a = 4
b = 8
c = 1
D = b ** 2 - 4 * a * c
print("Delta wynosi: ", D)
if D < 0:
    print("Brak rozwiązań")
elif D == 0:
    x1 = -b / (2 * a)
    print("Jedno rozwiązanie które wynosi: ", x1)
else:
    x1 = (-b - math.sqrt(D)) / (2 * a)
    x2 = (-b + math.sqrt(D)) / (2 * a)
    print("Dwa rozwiązania które wynoszą: ", x1, x2)