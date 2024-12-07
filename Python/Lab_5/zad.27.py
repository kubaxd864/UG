list1 = [1, 3, 5, 7 , 9, 11, 13, 15, 17, 19]
list2 = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
merged_list = []
if len(list1) == len(list2):
    for i in range(len(list1)):
        merged_list.append(list1[i])
        merged_list.append(list2[i])
    print(merged_list)
