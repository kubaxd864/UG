# keys = [
#     (10, "Sobczyk"),
#     (15, "Nowak"),
#     (1, "Lewandowski"),
#     (3, "Szklarczyk"),
#     (11, "Roślik"),
#     (21, "Adamczyk"),
#     (6, "Smyk"),
#     (18, "Janczewski"),
#     (17, "Kobyliński"),
#     (31, "Andrzejewski"),
#     ]
keys = []
with open("random_keys.txt", "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if line:
            line = line.strip("()")
            num_str, nazwisko = line.split(",", 1)
            num = int(num_str.strip())
            nazwisko = nazwisko.strip()
            keys.append((num, nazwisko))

sizes = [len(keys) * 0.5, len(keys) * 0.7, len(keys) * 0.9]            
m = len(keys)

def hash1(key, i):
    n_hash = sum(ord(c) for c in key[1]) % m
    return ((key[0] + n_hash) + i^2) % m

def input(size):
    t = ["_" for _ in range(m)]
    tries = []
    inserted_count = 0  
    for key in keys:
        if inserted_count >= size:
            break
        i = 0
        while i < m:
            place = hash1(key, i)
            if t[place] == "_":  
                t[place] = key
                inserted_count += 1
                tries.append(i + 1)
                break
            i += 1
    return t, tries

def find(element, t):
    for i in range(len(t)):
        place = hash1(element, i)
        if t[place] == element:
            return place
        if t[place] == "_":
            return None 
    return None  

def delete(element, t):
    for i in range(len(t)):
        place = hash1(element, i)
        if t[place] == element:
            t[place] = "DEL"
            return t
        if t[place] == "_":
            return None

for size in sizes:
    t, tries = input(size)
    avg = sum(tries) / len(tries)
    print(f"\n{'='*50}")
    print(f"Wyniki dla wypełnienia = {(size / m) * 100}%")
    print(f"{'='*50}\n")
    # print(f"Dla tablicy: {t}")
    print(f"Średnia liczba prób dodania elementu wynosi: {avg:.2f}")
    # pos = find((17, "Kobyliński"), t)
    # print(f"Element znajduje się na pozycji {pos}")
    # print(delete((15, "Nowak"), t))
