list = []
final_list = []
for i in range(1, 20 + 1):
    list.append(i)
list1 = list[::-1]
final_list.append(list)
final_list.append(list1)
print(final_list)