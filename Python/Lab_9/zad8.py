cars = {}

def add_car(licence_plate, brand, year, model):
    cars[licence_plate] = [brand, model, year]

license_plate = input('Podaj nr rejestracyjny pojazdu: ')
brand = input('Podaj markę pojazdu: ')
model = input('Podaj model pojazdu: ')
year = int(input('Podaj rok produkcji: '))
add_car(license_plate, brand, model, year)
add_car(licence_plate='GD1T567', brand='BMW', model='E36', year=1991)
print(cars)