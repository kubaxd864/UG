def elements(list, x):
    higher = 0
    equal = 0
    lower = 0
    for i in list:
        if i > x:
            higher += 1
        elif i == x:
            equal += 1
        else:
            lower += 1
    print('Elementów wyższych od x jest:',higher,'\nElementów równych x jest:', equal, '\nElementów mniejszych od x jest:', lower)
elements([1, 2, 3, 4, 5, 3, 7, 8, 1], 3)