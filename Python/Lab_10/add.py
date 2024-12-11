def addPlanet(name, density, planets):
    if not planets:
        planets[name] = density
    else:
        for planet in planets:
            if ord(planet['name'][0]) > ord(name[0]):
                planets.insert(planets.index(planet), {'name':name, 'density':density})
                break
    return planets