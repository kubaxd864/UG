import random as random
liczba = random.randint(1, 100)
podanaliczba = 0
while liczba != podanaliczba:
    podanaliczba = int(input("Podaj liczbę: "))
    if podanaliczba > liczba:
        print("Za dużo")
    elif podanaliczba < liczba:
        print("Za mało")
    else:
        print("Zgadłeś!")