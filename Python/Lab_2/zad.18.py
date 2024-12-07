temp = int(input("Podaj temperaturę: "))
if temp < 32:
    print("Mróz")
elif temp >= 32 and temp <= 59:
    print("Chłodno")
elif temp >= 60 and temp <= 77:
    print("Ciepło")
elif temp > 77:
    print("Gorąco")