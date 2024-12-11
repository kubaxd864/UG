def readPlanet(name, planets):
    krotka = []
    for planet in planets:
        if planet['name'] == name:
            krotka.append(planet['name'])
            krotka.append(planet['density'])
    return tuple(krotka)
