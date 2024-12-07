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

def decrypt(text, cipher_table):
    decrypted_text = ''
    reverse_cipher_table = {v: k for k, v in cipher_table.items()}

    for char in text:
        if char in reverse_cipher_table:
            decrypted_text += reverse_cipher_table[char] 
        else: 
            decrypted_text += char

    return decrypted_text


cipher_table = caesar_cipher_table()
print(decrypt('óhdpż dćfć, ektrń śzom yźsł l uagwę incj', cipher_table))