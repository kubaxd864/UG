liczby = []
max = 100
min = 1
while max > min:
    if max % 5 == 1 and max % 7 == 3:
        liczby.append(max)
    max -= 1
print(liczby)