def a():
    for i in range(15): 
        print(i) 
def b():
    for i in range(2,15): 
        print(i) 
def c():
    for i in range(2, 15, 4): 
        print(i) 
def d():
    n = 4 
    print("rozmiar: ",n) 
    
    for j in range(1, n+1): 
        print((n-j)*"-", end="") 
        print(j*"+")

letter = input("Podaj literę funkcji, którą chcesz wywołać: ")
if letter.lower() == "a":
    a()
elif letter.lower() == "b":
    b()
elif letter.lower() == 'c':
    c()
elif letter.lower() == 'd':
    d()
else:
    print("Nie ma takiej funkcji")