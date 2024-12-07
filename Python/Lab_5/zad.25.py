list = [1, 4, 7, 10, 35, 49, 60, 2, 23]
second_max = 0
index = 0
for i in list:
    if i == max(list):
        index = list.index(i)
        list.remove(i)
        second_max = max(list)
        list.insert(index, i)
print('Wartość:', second_max)  