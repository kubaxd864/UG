dict1 = {"jabłko" : 3, "banan" : 5, "wiśnia": 8, 'pomarańcza' : 10}
for i in dict1:
    dict1[i] = dict1[i] + dict1[i] * 0.1
print(dict1)