import random

def rand_list(n, min, max):
    return [random.randint(min, max) for _ in range(n)]

def rand_list_2(n, min, max):
    lista = []
    while n > 0:
        lista.append(random.randint(min, max))
        n -= 1
    return lista

print(rand_list(10, 1, 100))
print(rand_list_2(12, 1, 50))