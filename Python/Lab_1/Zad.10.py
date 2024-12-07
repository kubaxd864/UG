import random
h = 7
w = 1
space = 4
bombka = 'o'
for i in range(h):
    if(i < 4):
        if w >= 5:
            position = random.randint(1, w)
            print(' '*space,  '^'*(position - 1) + bombka + '^'*(w - position))
            w+=2
            space-=1
        else:
            print(' '*space,  '^'*w)
            w+=2
            space-=1
    else:
        position = random.randint(1, w - 4)
        print(' '*(space + 2),  '^'*((position - 1)) + bombka + '^'*((w - position) - 4))
        w+=2
        space-=1
print(' '*(space + 7) + '###')