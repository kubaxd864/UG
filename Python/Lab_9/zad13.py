def litery(text):
    letters = []
    for i in range(len(text)):
        letters.append(text[i].lower())
    return letters

def letters_count(letters):
    counted = {}
    for i in letters:
        print(i)
        if i not in counted:
            counted[i] = 1
        else:
            counted.update({i : counted[i] + 1})
    return counted

letters = litery('Rabarbar')
print(letters_count(letters))
