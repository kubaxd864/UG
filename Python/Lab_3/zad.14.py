a, b = 1, 1
n = 1

while a < 1000:
    print(f"Element {n}: {a}")
    a, b = b, a + b
    n += 1