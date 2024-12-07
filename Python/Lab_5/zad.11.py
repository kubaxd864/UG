Triple_digit = ['sto', 'dwieście', 'trzysta', 'czterysta', 'pięćset', 'sześćset', 'siedemset', 'osiemset', 'dziewięćset']
Double_digit = ['dziesięć', 'dwadzieścia', 'trzydzieści', 'czterdzieści', 'pięćdziesiąt', 'sześćdziesiąt', 'siedemdziesiąt', 'osiemdziesiąt', 'dziewięćdziesiąt']
Teen_digit = ['jedenaście', 'dwanaście', 'trzynaście', 'czternaście', 'piętnaście', 'szesnaście', 'siedemnaście', 'osiemnaście', 'dziewiętnaście']
Single_digit = ['jeden', 'dwa', 'trzy', 'cztery', 'pięć', 'sześć', 'siedem', 'osiem', 'dziewięć']
digit = int(input('Podaj liczbę: '))
if digit < 10:
    print(Single_digit[digit - 1])
elif digit > 10 and digit < 20:
    print(Teen_digit[digit - 11])
elif digit < 100:
    print(Double_digit[digit // 10 - 1], Single_digit[digit % 10 - 1])
elif digit > 100 and digit < 1000:
    print(Triple_digit[digit // 100 - 1], Double_digit[digit % 100 // 10 - 1], Single_digit[digit % 10 - 1])