j = 0
for i in range(100, 999):
    i = str(i)
    if i[j] < i[j + 1] and i[j + 1] < i[j + 2]:
            print(i)