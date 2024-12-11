import os

caesar_cipher = {'a': 'c', 'ą': 'ć', 'b': 'd', 'c': 'e', 'ć': 'ę', 'd': 'f', 'e': 'g', 'ę': 'h', 'f': 'i', 'g': 'j', 'h': 'k', 'i': 'l', 'j': 'ł', 'k': 'm', 'l': 'n', 'ł': 'o', 'm': 'ó', 'n': 'p', 'o': 'r', 'ó': 's', 'p': 'ś', 'r': 't', 's': 'u', 'ś': 'w', 't': 'y', 'u': 'z', 'w': 'ź', 'y': 'ż', 'z': 'a', 'ź': 'ć', 'ż': 'd'}

def encrypt(text, cypher_table):
    encrypted_text = ''
    for i in text:
        if i in cypher_table:
            encrypted_text += cypher_table[i]
        else:
            encrypted_text += i
    return encrypted_text

def modify_and_copy_file(source_path, destination_path):
    try:
        with open(source_path, 'r', encoding='utf-8') as file:
            lines = file.readlines() 
            modified_lines = []
            for line in lines:
                modified_lines.append(encrypt(line, caesar_cipher))
        
        with open(destination_path, 'w', encoding='utf-8') as file:
            file.write('\n'.join(modified_lines))
        print(f"Plik został skopiowany i zakodowany z {source_path} do {destination_path}.")
        
    except FileNotFoundError:
        print("Plik źródłowy nie istnieje. Sprawdź ścieżkę i spróbuj ponownie.")
    except PermissionError:
        print("Brak uprawnień do odczytu lub zapisu pliku.")
    except Exception as e:
        print(f"Wystąpił nieoczekiwany błąd: {e}")

if __name__ == "__main__":
    source = input("Podaj ścieżkę do pliku źródłowego: ")
    user_profile = os.path.expanduser("~")
    destination = os.path.join(user_profile, "Desktop", "kopiowany_plik")
    modify_and_copy_file(source, destination)