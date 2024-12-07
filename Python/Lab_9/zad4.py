def replace(d, v, e):
    for i in d:
        if d[i] == v:
            d.update({i : e})

d = {'Ransom' : 5, 'Decadence': 4, 'Ritz Carlton': 5}
v = 5
e = 4
replace(d, v, e)