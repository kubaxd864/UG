word = input("Podaj słowo: ")
reversedword = ""
length = len(word)
while length > 0:
    reversedword += word[length - 1]
    length -= 1
print(reversedword)