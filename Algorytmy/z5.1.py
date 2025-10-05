import requests
import random

def get_words():
    url = "https://raw.githubusercontent.com/bukowa/1000-common-words/master/Polish-1000-common.txt"
    response = requests.get(url)
    words = response.text.splitlines()
    return [word.split('\t')[0] for word in words if word]

words = get_words()

def hash1(key, m): # Suma kodów ASCII
    return sum(ord(c) for c in key) % m

def hash2(key, m):  # Funkcja Wielomianowa
    p = 7 
    hash_val = 0
    for c in key:
        hash_val = (hash_val * p + ord(c)) % m
    return hash_val

def analyze(m, hash_func):
    hash_table = [[] for _ in range(m)]
    
    keys = random.sample(words, 2 * m)
    
    for key in keys:
        h = hash_func(key, m)
        hash_table[h].append(key)
    
    empty = sum(1 for slot in hash_table if not slot)
    max_len = max(len(slot) for slot in hash_table)
    avg_len = sum(len(slot) for slot in hash_table) / len(hash_table)
    
    return empty, max_len, avg_len

sizes = [200, 201, 256]
hash_funcs = [("Suma ASCII", hash1), ("Wielomianowa", hash2)]

for m in sizes:
    print(f"\n{'='*50}")
    print(f"Wyniki dla m = {m} (2*m = {2*m} kluczy)")
    print(f"{'='*50}")
    
    for name, func in hash_funcs:
        empty, max_len, avg_len = analyze(m, func)
        print(f"\nFunkcja: {name}")
        print(f"- Puste sloty: {empty}")
        print(f"- Maks. długość listy: {max_len}")
        print(f"- Średnia długość listy: {avg_len:.2f}")

# Wybrałem takie rozmiary tablicy 200, 201, 256, aby przetestować zwykłą liczbę, liczbę pierwszą oraz potęgę 2 
# pierwszą funkcją hashującą jest suma kodów ascii, a drugą jest funkcja mnożąca
# ==================================================
# Wyniki dla m = 200 (2*m = 400 kluczy)
# ==================================================

# Funkcja: Suma ASCII
# - Puste sloty: 36
# - Maks. długość listy: 7
# - Średnia długość listy: 2.00

# Funkcja: Wielomianowa
# - Puste sloty: 29
# - Maks. długość listy: 6
# - Średnia długość listy: 2.00

# ==================================================
# Wyniki dla m = 201 (2*m = 402 kluczy)
# ==================================================

# Funkcja: Suma ASCII
# - Puste sloty: 28
# - Maks. długość listy: 7
# - Średnia długość listy: 2.00

# Funkcja: Wielomianowa
# - Puste sloty: 30
# - Maks. długość listy: 6
# - Średnia długość listy: 2.00

# ==================================================
# Wyniki dla m = 256 (2*m = 512 kluczy)
# ==================================================

# Funkcja: Suma ASCII
# - Puste sloty: 36
# - Maks. długość listy: 8
# - Średnia długość listy: 2.00

# Funkcja: Wielomianowa
# - Puste sloty: 41
# - Maks. długość listy: 6
# - Średnia długość listy: 2.00