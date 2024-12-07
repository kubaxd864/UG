temp = int(input("Podaj temperaturę: "))
if temp < 0:
    print("Mróz")
elif temp >= 0 and temp <= 15:
    print("Chłodno")
elif temp >= 16 and temp <= 25:
    print("Ciepło")
elif temp > 25:
    print("Gorąco")