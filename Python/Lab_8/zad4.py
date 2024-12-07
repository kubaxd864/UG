def pow(n, i, suma = 0): 
    if i == 0:
        return suma
    else:
        return pow(n, i - 1, suma + n)
    
n = 3
print(pow(n, n))

