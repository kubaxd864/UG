word = input("Podaj słowo: ")
vowels = ['a', 'e', 'i', 'o', 'u', 'y']
count = 0
for i in range(len(word)):
    if word[i] in vowels:
        count += 1
print(count)