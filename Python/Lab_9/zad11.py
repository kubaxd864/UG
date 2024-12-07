miasta = {
    'Warszawa': {
        'kraj': 'Polska',
        'liczba_ludnosci': 1793579,
        'stolica': True
    },
    'Berlin': {
        'kraj': 'Niemcy',
        'liczba_ludnosci': 3644826,
        'stolica': True
    },
    'Paryż': {
        'kraj': 'Francja',
        'liczba_ludnosci': 2148327,
        'stolica': True
    },
    'Kraków': {
        'kraj': 'Polska',
        'liczba_ludnosci': 779115,
        'stolica': False
    },
    'Wrocław': {
        'kraj': 'Polska',
        'liczba_ludnosci': 640648,
        'stolica': False
    }
}

for miasto, info in miasta.items():
    print(f"Miasto: {miasto}, Kraj: {info['kraj']}, Liczba ludności: {info['liczba_ludnosci']}, Stolica: {'Tak' if info['stolica'] else 'Nie'}")