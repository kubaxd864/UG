def positive(a, b, c):
    if a > 0 and b > 0 and c > 0:
        return True
    else:
        print('liczby muszą być dodatnie')
        return False

def triangle(a, b, c):
    if positive(a, b, c) and a + b > c and a + c > b and b + c > a:
        print("1")
    else:
        print("0")
triangle(2, 4, 5)