import random
list = []
for i in range(10):
    if i == 0:
        list.append(random.randint(1, 100))
    else:
        list.append(random.randint(list[i - 1], 100))
print(list)