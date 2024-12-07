def odwroc_slownik(dict):
    reversed_dict = {}
    for i in dict:
        reversed_dict[dict[i]] = i
    return reversed_dict

slownik = {'Ransom' : 5, 'Decadence': 4, 'Ritz Carlton': 2, 'Gods Plan' : 3, 'Lucid Dreams': 1}
print(odwroc_slownik(slownik))