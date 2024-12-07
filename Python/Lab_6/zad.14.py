def a():
    list = ['jabłko', 'banan', 'jabłko', 'wiśnia', 'banan']
    for i in list:
        if list.count(i) > 1:
            list.remove(i)
    list = set(list)
    print(list)
def b():
    list = ['jabłko', 'banan', 'jabłko', 'wiśnia', 'banan']
    print(set(list))
a()
b()