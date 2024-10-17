a = 234
list = [int(a) for a in str(a)]
if len(list) < 3:
    list.append(0)
    list.sort()
    print(list)
else:
    print(list)