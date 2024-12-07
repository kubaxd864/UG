lista1 = [2, 4, 5, 7, 9, 11]
lista2 = [1, 3, 4, 8, 10, 12]
tak = False
for i in lista1:
    if i in lista2:
        print("TAK")
        tak = True
if tak == False:
    print("NIE")
