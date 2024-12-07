Jan = {'Matematyka': 5, 'Fizyka': 4, 'Chemia': 3, 'Biologia': 4}
Adam = {'Matematyka': 4, 'Fizyka': 3, 'Chemia': 4, 'Biologia': 5}
if len(Jan) != len(Adam):
    print('Dane są niekompletne')
else:
    for i in Jan:
        if i == 'Matematyka' or i == 'Biologia':
            if Jan[i] > Adam[i]:
                print(f'{i}: Jan ({Jan[i]})')
            elif Adam[i] > Jan[i]:
                print(f'{i}: Adam ({Adam[i]})')
