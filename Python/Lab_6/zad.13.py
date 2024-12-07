dict1 = {'kot': 3, 'pies': 2, 'ryba': 1, 'ptak': 4}
toDel = []
for i in dict1:
    if dict1[i] < 3:
        toDel.append(i)
for i in toDel:
    dict1.pop(i)
print(dict1)