def tlumacz_slowo(word, dict):
    if word in dict:
        return word
    else:
        return 'Brak Tłumaczenia'
    
print(tlumacz_slowo('pies', { "kot": "cat", "pies": "dog" }))