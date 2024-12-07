def stworz_histogram(list):
    list_count = {}
    for i in list:
        if i not in list_count:
            list_count[i] = 1
        elif i in list_count:
            list_count[i] += 1
    return list_count

cyfry = [1, 3, 4, 1, 5, 6, 3, 6, 9, 7, 4, 1]
print(stworz_histogram(cyfry))