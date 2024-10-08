def christmastree():
    h = 7
    w = 1
    space = 4
    for i in range(0,h):
        if(i < 4):
            print(' '*space,  '^'*w)
            w+=2
            space-=1
        else:
            print(' '*space,  '^'*(w - 4))
            w+=2
            space-=1
christmastree()