langs = {'polski': 'Witaj', 'angielski': 'Hello', 'niemiecki': 'Hallo', 'francuski': 'Bonjour' }
def powitaj_z_jezykiem(imie, jezyk):
    return langs[jezyk] + ', ' + imie + '!'

jezyk = input('Podaj język w którym chcesz się przywitać: ')
imie = input('Podaj swoje imię: ')
print(powitaj_z_jezykiem(imie, jezyk.lower()))