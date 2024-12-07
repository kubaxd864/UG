move = 3
list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
for i in range(move):
    list.append(list.pop(0))
print(list)