list = [1, 5, 6, 8, 2, 5]
def sum(list):
    sum = 1
    for i in list:
        sum = i * sum
    print(sum)
sum(list)