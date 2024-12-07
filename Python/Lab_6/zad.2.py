word = 'Hello World'
dictionary = {}
for i in range(len(word)):
    if word[i] == ' ':
        pass
    elif word[i] not in dictionary:
        dictionary.update({word[i]: 1})
    else:
        dictionary[word[i]] += 1
print(dictionary)