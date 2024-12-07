a = [1, 12, 4, 66, 43, 78, 33, 22, 11, 90]
def move(a, k):
    n = len(a)
    b = [0] * n
    for i in range(n):
        b[(i+k) % n] = a[i]
    return b
print(move(a, 3))