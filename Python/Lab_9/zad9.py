osoby = {
    '1': {
        'imie': 'Jan',
        'nazwisko': 'Kowalski',
        'wiek': 30,
        'samochody': [
            {
                'marka': 'Toyota',
                'model': 'Corolla',
                'rok_produkcji': 2020
            },
            {
                'marka': 'Ford',
                'model': 'Focus',
                'rok_produkcji': 2019
            }
        ]
    },
    '2': {
        'imie': 'Anna',
        'nazwisko': 'Nowak',
        'wiek': 25,
        'samochody': [
            {
                'marka': 'Volkswagen',
                'model': 'Golf',
                'rok_produkcji': 2021
            }
        ]
    },
    '3': {
        'imie': 'Piotr',
        'nazwisko': 'Zalewski',
        'wiek': 40,
        'samochody': [
            {
                'marka': 'BMW',
                'model': 'X5',
                'rok_produkcji': 2018
            },
            {
                'marka': 'Audi',
                'model': 'A4',
                'rok_produkcji': 2017
            }
        ]
    }
}

for id_osoby, info in osoby.items():
    print(f"ID: {id_osoby}, Imię: {info['imie']}, Nazwisko: {info['nazwisko']}, Wiek: {info['wiek']}")
    print("Samochody:")
    for samochod in info['samochody']:
        print(f"  - Marka: {samochod['marka']}, Model: {samochod['model']}, Rok produkcji: {samochod['rok_produkcji']}")