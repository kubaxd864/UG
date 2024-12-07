def a():
    napis="Ala ma kota"
    print (napis[0])
    print (napis[2])
    print (napis[1:3])
    print (napis[1 :: 3])
    print (napis[ :: ])
    print (len (napis) )
    print (napis.lower () )
    print (napis.count (" "))

def b():
    listal=[1, 2, 3, 4, 5, 6]
    lista2=[1,3,4, 5, 9]
    print (listal, lista2)
    lista3=[listal, lista2]
    lista4=listal+lista2
    print (lista3)
    print (lista4)

def c():
    listal=[1, 2, 3, 4, 5, 6]
    for i in listal:
        print(i)
    for i in range (len (listal) ) :
        print(listal[i])

def d():
    import random
    print(random.randint (3, 9))

def e():
    import random
    lst = []
    for i in range (10) :
        lst.append (random.randint (1,10))
    print(lst)

letter = input("Podaj literę funkcji, którą chcesz wywołać: ")
if letter.lower() == "a":
    a()
elif letter.lower() == "b":
    b()
elif letter.lower() == 'c':
    c()
elif letter.lower() == 'd':
    d()
elif letter.lower() == 'e':
    e()
else:
    print("Nie ma takiej funkcji")