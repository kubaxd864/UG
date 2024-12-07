def invert(d):
    dInv = {}
    for i in d:
        if d[i] not in dInv:
            dInv[d[i]] = [i]
        elif d[i] in dInv:
            dInv[d[i]].append(i)
    print(dInv)


d = {'Ransom' : 5, 'Decadence': 4, 'Ritz Carlton': 5, 'Gods Plan' : 3, 'Lucid Dreams': 5}
invert(d)