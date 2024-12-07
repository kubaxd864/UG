table = []
a = int(input("Podaj pierwszy bok: "))
table.append(a)
b = int(input("Podaj drugi bok: "))
table.append(b)
c = int(input("Podaj trzeci bok: "))
table.append(c)
table.sort(reverse=True)
if table[0] < table[1] + table[2] :
    print("Można zbudować trójkąt")