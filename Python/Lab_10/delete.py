def deletePlanet(density, planets):
    planets_remove = []
    for planet in planets:
        if planet['density'] <= density:
            planets_remove.append(planet)
    for i in planets_remove:
        planets.remove(i)
    return planets