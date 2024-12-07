list1 = ['ziemniaki', 'pomidory', 'ogórki', 'por', 'seler']
list2 = ['mleko', 'jajka', 'ziemniaki', 'chleb', 'pomidory']
print('Inne Produkty dostępne w sklepie: ', set(list1).difference(set(list2)), '\nInne Produkty tylko z listy zakupów', set(list2).difference(set(list1)), '\nProdukty dostępne w sklepie: ', set(list1).intersection(list2))