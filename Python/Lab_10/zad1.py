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

def add_element(name, density):
    for planet in planets:
        if ord(planet['name'][0]) > ord(name[0]):
            planets.insert(planets.index(planet), {'name':name, 'density':density})
            break
    print('Add', planets)

def read_element(name):
    for planet in planets:
        if planet['name'] == name:
            return tuple(planet)

def update_element(name, density):
    for planet in planets:
        if planet['name'] == name:
            planet['density'] = density
    print('Update', planets)

def delete_elements(density):
    planets_remove = []
    for planet in planets:
        if planet['density'] <= density:
            planets_remove.append(planet)
    for i in planets_remove:
        planets.remove(i)
    print('Delete', planets)

def find_planet_index(name):
    for planet in planets:
        if planet['name'] == name:
            return planets.index(planet)
    return -1

print('1.Dodaj')        
print('2.Odczytaj')
print('3.Zaktualizuj')
print('4.Usuń')
print('5.Znajdź Index')
func_nr = int(input('Podaj nr funkcji którą chcesz uruchomić: '))
if func_nr == 1:
    add_element('Saturn', 2.456)
elif func_nr == 2:
    print(read_element('Earth'))
elif func_nr == 3:
    update_element('Mars', 5.427)
elif func_nr == 4:
    delete_elements(5.300)
elif func_nr == 5:
    print(find_planet_index('Mercury'))
else:
    print('Podaj poprawny nr funkcji')