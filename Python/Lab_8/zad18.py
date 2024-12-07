def max(lst):
    lst = sorted(lst)
    return lst[len(lst) - 1]

lista = [5, 7, 2, 3, 22, 11, 4]
print(max(lista))