def msc_zerowe(przedzial, epsilon, f):
    a, b = przedzial
    if f(a) * f(b) > 0:
        return None
    while abs(a - b) > epsilon:
        srodek = (a + b) / 2
        if f(a) * f(srodek) <= 0:
            b = srodek
        else:
            a = srodek
    return a
print(msc_zerowe((0, 3), 0.0001, lambda x: x**3 - 2*x**2 + x - 7))