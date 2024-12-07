def filtruj_slownik(dict, prog):
    selected_pairs = {}
    for i in dict:
        if dict[i] > prog:
            selected_pairs[i] = dict[i]
    return selected_pairs

dict  = {'Jakub' : 20, 'Jan': 20, 'Anna': 22, 'Amelia' : 18, 'Marta': 24, 'Martyna': 19}
print(filtruj_slownik(dict, 20))