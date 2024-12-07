def zlicz_wyrazy(text):
    words = text.split(' ')
    words_count = {}
    for word in words:
        if word in words_count:
            words_count[word] += 1
        else:
            words_count[word] = 1
    return words_count

text = 'Witaj Świecie'
print(zlicz_wyrazy(text))