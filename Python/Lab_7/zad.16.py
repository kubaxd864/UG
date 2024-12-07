def replace(poz_1, poz_2, lista):
    lista[poz_1], lista[poz_2] = lista[poz_2], lista[poz_1]
    print(lista)
replace(2, 4, [1, 2, 3, 4, 5, 6, 7, 8, 9])