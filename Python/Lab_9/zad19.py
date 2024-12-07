def najczestsza_wartosc(dict):
    key_count = {}
    key_max = None
    for i in dict:
        if dict[i] not in key_count:
            key_count[dict[i]] = 1
        else:
            key_count[dict[i]] += 1
    max_value = max(key_count, key=key_count.get)
    for klucz, wartosc in dict.items():
        if wartosc == max_value:
            key_max = klucz  
    return key_max

dict = {'Jakub' : 20, 'Jan': 20, 'Anna': 22, 'Amelia' : 18, 'Marta': 24, 'Martyna': 19}
print(najczestsza_wartosc(dict))