def permutacje(s):
    if len(s) == 0:
        return ['']
    wyniki = []
    for i in range(len(s)):
        znak = s[i]
        pozostałe = s[:i] + s[i+1:]
        
        for perm in permutacje(pozostałe):
            wyniki.append(znak + perm)
    
    return wyniki

ciag = "abc"
print(permutacje(ciag)) 
