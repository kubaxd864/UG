import math

name = input("Podaj swoje imię: ")
birth_year = int(input("Podaj rok swojego urodzenia: "))
birth_month = input("Podaj miesiąc swojego urodzenia: ")
birth_day = int(input("Podaj dzień swojego urodzenia: "))

def oblicz_biorytm(nazwa_fali, okres):
	wynik = math.sin(((2*math.pi)/okres) * birth_day)
	print(f"{nazwa_fali}: {wynik}")
	ocen_biorytm(nazwa_fali, wynik, okres)

def ocen_biorytm(nazwa_fali, wynik, okres):
	if wynik > 0.5:
		print(f"{nazwa_fali}: Świetny wynik! Gratulacje!")
	elif wynik < -0.5:
		print(f"{nazwa_fali}: Słabszy dzień, ale głowa do góry!")
		wynik_jutro = math.sin(((2 * math.pi) / okres) * (birth_day + 1))
		if wynik_jutro > wynik:
			print("Nie martw się. Jutro będzie lepiej!")
		else:
			print("Jutro może być trochę trudniej, zadbaj o siebie.")

print(f"Witaj {name} uzyskane przez ciebie wyniki to: ")
oblicz_biorytm("Fala Fizyczna", 23)
oblicz_biorytm("Fala Emocjonalna", 28)
oblicz_biorytm("Fala Intelektualna", 33)
