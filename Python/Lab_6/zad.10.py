word = 'Programowanie jest fajne, programowanie jest proste'
dictionary = {}
for i in word.split(' '):
    if i.lower() not in dictionary:
        dictionary.update({i.lower(): 1})
    else:
        dictionary[i] += 1
print(dictionary)