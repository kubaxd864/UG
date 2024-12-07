def polacz_slowniki(dict1, dict2):
    for i in dict2:
        if i in dict1:
            dict1[i] += dict2[i]
        else:
            dict1[i] = dict2[i]
    return dict1

dict1 = {'Jakub' : 20, 'Jan': 20, 'Anna': 22}
dict2 = {'Jakub' : 18, 'Marta': 24, 'Martyna': 19}

print(polacz_slowniki(dict1, dict2))