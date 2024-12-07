def power(a, b):
    if b > 1:
        return a * power(a, b - 1)
    return a
print(power(2,4))