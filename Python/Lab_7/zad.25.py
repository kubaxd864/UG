def sqrt(n):
    kd = 1
    kg = n
    while True:
        if kg - kd <= 1:
            return False
        j = (kg + kd) // 2
        if j * j == n:
            return j
        elif j * j > n:
            kg = j
        else:
            kd = j

print(sqrt(9))