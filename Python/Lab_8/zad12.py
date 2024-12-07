from zad11 import tail
from zad10 import head

def rewers(list, new_list):
    if isEmpty(list):
        return new_list
    else:
        new_list.insert(0, head(list))
        return rewers(tail(list), new_list)

def isEmpty(list):
    return len(list) == 0  

lista = [8, 4, 6, 1, 2]
new_list = []    
print(rewers(lista, new_list)) 