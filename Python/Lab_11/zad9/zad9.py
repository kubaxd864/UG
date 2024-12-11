import shutil
import os

def copy_file(source_path, destination_path):
    try:
        shutil.copy2(source_path, destination_path)
        print(f"Plik został skopiowany z {source_path} do {destination_path}.")
    except FileNotFoundError:
        print("Plik źródłowy nie istnieje. Sprawdź ścieżkę i spróbuj ponownie.")
    except PermissionError:
        print("Brak uprawnień do odczytu lub zapisu pliku.")
    except Exception as e:
        print(f"Wystąpił nieoczekiwany błąd: {e}")

if __name__ == "__main__":

    source = input("Podaj ścieżkę do pliku źródłowego: ")
    user_profile = os.path.expanduser("~")
    destination = os.path.join(user_profile, "Desktop", "kopia")
    copy_file(source, destination)