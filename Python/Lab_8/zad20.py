def flat_list(zagnieżdżona_lista):
    płaska_lista = []
    
    for element in zagnieżdżona_lista:
        if isinstance(element, list):
            płaska_lista.extend(flat_list(element))
        else:
            płaska_lista.append(element)
    
    return płaska_lista

zagnieżdżona_lista = [1, [2, [3, 4], 5], 6]
płaska_lista = flat_list(zagnieżdżona_lista)
print(płaska_lista)