def findx(x, list, low, high):
    if low > high:
        return False
    
    mid = (low + high) // 2
    if list[mid] == x:
        return True
    elif list[mid] < x:
        return findx(x, list, mid + 1, high)
    else:
        return findx(x, list, mid - 1, high)

lista = [1, 2, 3, 4, 5]
x = 3
print(findx(x, lista, 0, len(lista) - 1))