import random

def sorted_rand_list(n, min, max):
    lista = []
    current_min = min
    for i in range(n):
        lista.append(random.randint(current_min, max))
        current_min = lista[i] + 1
    return lista

print(sorted_rand_list(10, 1, 100))
