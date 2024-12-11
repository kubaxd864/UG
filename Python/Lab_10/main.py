from add import addPlanet
from read import readPlanet
from update import updatePlanet
from delete import deletePlanet
from find import searchPlanet

planets = [
    {
        'name':'Earth',
        'density': 5.515
    },
    {
        'name':'Mars',
        'density': 3.933
    },
    {
        'name':'Mercury',
        'density': 5.429
    },
    {
        'name':'Wenus',
        'density': 5.243
    }
]
def menu():
    print('1.Dodaj')        
    print('2.Odczytaj')
    print('3.Zaktualizuj')
    print('4.Usuń')
    print('5.Znajdź Index')
    print('6.Uruchom Testy')
    func_nr = int(input('Podaj nr funkcji którą chcesz uruchomić: '))
    if func_nr == 1:
        addPlanet('Saturn', 2.456, planets)
    elif func_nr == 2:
        print(readPlanet('Earth', planets))
    elif func_nr == 3:
        updatePlanet('Mars', 5.427, planets)
    elif func_nr == 4:
        deletePlanet(5.300, planets)
    elif func_nr == 5:
        print(searchPlanet('Mercury', planets))
    else:
        print('Podaj poprawny nr funkcji')
menu()