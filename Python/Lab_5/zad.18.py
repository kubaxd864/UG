list = [2, 4, 7, 9, 11, 1, 3]
print(list)
element = list[0]
list[0] = list[len(list) - 1]
list[len(list) - 1] = element
print(list)