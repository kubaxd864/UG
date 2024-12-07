import math

a_x = int(input("Podaj X parametru A: "))
a_y = int(input("Podaj Y parametru A: "))
b_x = int(input("Podaj X parametru B: "))
b_y = int(input("Podaj Y parametru B: "))
print("Odległość A od B wynosi: ", math.sqrt(((b_x - a_x) * 2) + ((b_y - a_y) * 2)))