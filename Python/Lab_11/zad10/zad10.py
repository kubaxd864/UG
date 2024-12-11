import os

def modify_and_copy_file(source_path, destination_path):
    try:
        with open(source_path, 'r') as file:
            lines = file.readlines() 
            
        modified_lines = []
        for line in lines:
            words = line.split()
            modified_words = []
            for word in words:
                if word == 'nie':
                    modified_words.append('tak')
                else:
                    modified_words.append(word)
            modified_lines.append(' '.join(modified_words))

        with open(destination_path, 'w') as file:
            file.write('\n'.join(modified_lines))

        print(f"Plik został skopiowany i zmodyfikowany z {source_path} do {destination_path}.")
        
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