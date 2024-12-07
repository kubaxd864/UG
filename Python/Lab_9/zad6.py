def caesar_cipher_table():
    alphabet = 'aąbcćdeęfghijklłmnoóprsśtuwyzźż'
    cipher_table = {}
    licznik = 0

    for i in range(len(alphabet)):
        if 3 + licznik < len(alphabet):
            cipher_table[alphabet[i]] = alphabet[3 + licznik]
            licznik += 1
        else:
            licznik = 0
            cipher_table[alphabet[i]] = alphabet[licznik]
            licznik += 1  
    return cipher_table

def encrypt(text, cypher_table):
    encrypted_text = ''
    for i in text:
        if i in cypher_table:
            encrypted_text += cypher_table[i]
        else:
            encrypted_text += i
    return encrypted_text

cipher_table = caesar_cipher_table()
print(encrypt('MĘŻNY BĄDŹ, CHROŃ PUŁK TWÓJ I SZEŚĆ FLAG'.lower(), cipher_table))
