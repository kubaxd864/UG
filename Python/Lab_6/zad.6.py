dict1 = {'a': 1, 'b': 2, 'c': 3}
dict2 = {}
for i in dict1:
    dict2.update({dict1[i]: i})
print(dict2)