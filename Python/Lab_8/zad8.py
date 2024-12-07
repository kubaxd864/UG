def NWD(a, b):
    if b == 0: 
        return a 
    else:
        return NWD(b, a % b)  

print(NWD(10, 5))  