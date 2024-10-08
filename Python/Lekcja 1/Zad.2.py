def christmastree():
    h = 7
    w = 1
    max_w = 7
    for i in range(0,h):
        if(i < 4):
            print(''*max_w,  '^'*w)
            w+=2
        else:
            w = 5
christmastree()