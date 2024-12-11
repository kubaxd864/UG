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

def test_addPlanet():
    assert addPlanet('Saturn', 2.456, planets) == [{'name':'Earth','density': 5.515},{'name':'Mars','density': 3.933},{'name':'Mercury','density': 5.429},{'name':'Saturn','density': 2.456},{'name':'Wenus','density': 5.243}]

def test_readPlanet():
    assert readPlanet('Earth', planets) == ('Earth', 5.515)

def test_updatePlanet():
    assert updatePlanet('Earth', 5.560, planets) ==  [{'name':'Earth','density': 5.560},{'name':'Mars','density': 3.933},{'name':'Mercury','density': 5.429},{'name':'Saturn','density': 2.456},{'name':'Wenus','density': 5.243}]

def test_deletePlanet():
    assert deletePlanet(4.000, planets) == [{'name':'Earth','density': 5.560},{'name':'Mercury','density': 5.429},{'name':'Wenus','density': 5.243}]

def test_searchPlanet():
    assert searchPlanet('Wenus', planets) == 2