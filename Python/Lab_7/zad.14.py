def exists(e, lista):
    if e in lista:
        print('Element:', e , 'Występuje w liście', lista)
    else:
        print('Danego elementu nie ma w liście')
exists(1, [1,2,3,2,8,2,4,5,3,1,4,6])
