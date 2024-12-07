from zad1 import silnia

def binominal_coefficient(a, b):
    coefficient = silnia(a) / silnia(b) * silnia(a - b)
    return coefficient

print(binominal_coefficient(4, 3))