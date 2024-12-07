def zliczanie(lst, n):
    if not lst:
        return 0
    else:
        count = 1 if lst[0] == n else 0
        return count + zliczanie(lst[1:], n)

lista = [1, 2, 3, 2, 4, 2, 5]
n = 2
print(zliczanie(lista, n))