word = 'listonosz'
def reverse(word):
    reversed = ''
    for i in range(len(word)):
        reversed += word[(len(word) - 1) - i]
    print(reversed)
reverse(word)