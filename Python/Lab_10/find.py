def searchPlanet(name, planets):
    for planet in planets:
        if planet['name'] == name:
            return planets.index(planet)
    return -1