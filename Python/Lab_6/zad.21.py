A = {1, 3, 5, 7, 9}
a = int(input('Podaj liczbę którą chcesz sprawdzić: '))
if a in A:
    print('Liczba znajduje się w zbiorze')
else:
    A.add(a)
    print('Liczba została dodana do zbioru')