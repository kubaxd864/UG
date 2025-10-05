m = 13
t = ["_" for _ in range(m)]
keys = [6, 19, 28, 41, 54]

def hash1(k, i):
    return (k + i) % m

def linear_hashing():
    for key in keys:
        i = 0
        while i < m:
            place = hash1(key, i)
            if t[place] == "_":  
                t[place] = key
                break
            i += 1
    return t

print(linear_hashing())