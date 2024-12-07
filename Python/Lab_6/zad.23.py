import random
A = {1}
for i in range(10): A.add(random.randint(1, 20))
for i in A:
    if i < 10:
        print(i)