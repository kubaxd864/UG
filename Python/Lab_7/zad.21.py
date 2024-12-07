def find_index_x(list, x):
    list = sorted(list)
    for i in range(len(list) - 1, 0, -1):
        if list[i] == x:
            return i

def find_index_x_2(list, x):
    last_index = len(list) - 1
    list = sorted(list)
    while last_index >= 0:
        if list[last_index] == x:
            return last_index
        last_index -= 1

print(find_index_x([1, 2, 3, 4, 5, 3], 3))
print(find_index_x_2([1, 2, 3, 4, 5, 3], 3))