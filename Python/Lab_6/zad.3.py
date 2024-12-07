dict1 = {'Jakub' : 20, 'Jan': 20, 'Anna': 22}
dict2 = {'Piotr' : 18, 'Marta': 24, 'Martyna': 19}
for i in range(len(dict2)):
    dict1.update(dict2)
print(dict1)