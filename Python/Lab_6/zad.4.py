dict1 = {'Jan': 20, 'Anna': 22,'Piotr' : 18, 'Marta': 24}
for i in dict1:
    if dict1[i] == 22 or dict1[i] == 23:
        print(i)
    elif dict1[i] != 22:
        dict1.update({'Anna': 22})
    elif dict1[i] != 23:
        dict1.update({'Julia': 23})
print(dict1)