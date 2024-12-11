tablica = [21, 5, 7, 33, 11, 2, 6]

def bubble_sort(table):
    for i in range(len(table)):
        for j in range(0, len(table) - i - 1):
            if table[j] > table[j + 1]:
                table[j], table[j + 1] = table[j+1], table[j]
    return table