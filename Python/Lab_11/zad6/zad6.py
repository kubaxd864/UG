tablica = [21, 5, 7, 33, 11, 2, 6]

def selection_sort(tablica):
    sorted_table = []
    for i in range(len(tablica)):
        sorted_table.append(max(tablica))
        tablica.pop(tablica.index(max(tablica)))
    tablica = sorted_table
    return tablica
