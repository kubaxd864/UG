a = int(input("Podaj pierwszy bok: "))
b = int(input("Podaj drugi bok: "))
c = int(input("Podaj trzeci bok: "))
if a == b and b == c:
    print("Trójkąt jest równoboczny")
elif a == b or a == c or b == c:
    print("Trójkąt jest równoramienny")
else:
    print("Trójkąt jest różnoboczny")