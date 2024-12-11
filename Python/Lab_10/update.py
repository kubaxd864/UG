def updatePlanet(name, density, planets):
    for planet in planets:
        if planet['name'] == name:
            planet['density'] = density
    return planets