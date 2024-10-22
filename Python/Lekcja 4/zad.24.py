list = [2, 4, 6, 8, 10]
def a():
    sum = 0
    for i in range(len(list)):
        sum += list[i]
    print(sum)

def b():
    print(sum(list))

a()
b()