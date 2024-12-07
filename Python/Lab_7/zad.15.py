def exists_2(e, lista):
    lista = sorted(lista)
    if e in lista:
        print('Element:', e , 'Występuje w liście', lista)
    else:
        print('Danego elementu nie ma w liście')
exists_2(1, [1,2,3,2,8,2,4,5,3,1,4,6])