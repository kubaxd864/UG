def sort(lista):
    isSorted = True
    for i in range(len(lista) - 1):
        if lista[i] <= lista[i + 1]:
            pass
        else:
            print('Lista nie jest posortowana niemalejąco')
            isSorted = False
    if isSorted:
        print('Lista jest posortowana niemalejąco')
sort([1,1,2,2,3,4,8,5,6,9,11])