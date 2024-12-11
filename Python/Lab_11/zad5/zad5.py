tablica = [1, 3, 4, 5, 7, 9, 11]

def in_table(x, tablica):
    for number in tablica:
        if number == x:
            return True
    return False