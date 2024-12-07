l1 = [1, 2, 4, 5, 6, 3, 7, 8, 9]
l2 = [1, 2, 3, 4, 5, 6, 7, 8, 9]

def inspermutation(l1, l2):
    if sorted(l1) == sorted(l2):
        return True
    return False

print(inspermutation(l1, l2))