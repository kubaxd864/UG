import math
import matplotlib.pyplot as plt

alfa = int(input("Podaj kąt pocisku w stopniach: "))
cel = int(input("Podaj cel do zniszczenia z zakresu [50, 340]: "))
print(f"Wybrano cel {cel}")

h = 100
v = 50
g = 9.81
proby = 0

def zapisz_trajektorie(alfa_stopnie, h, v, g):
    alfa_rad = math.radians(alfa_stopnie)
    x_max = (v * math.cos(alfa_rad) / g) * (
        v * math.sin(alfa_rad) + math.sqrt((v * math.sin(alfa_rad))**2 + 2 * g * h)
    )
    punkty = 400
    x = [i * x_max / (punkty - 1) for i in range(punkty)]
    y = [h + xi * math.tan(alfa_rad) - (g * xi**2) / (2 * v**2 * math.cos(alfa_rad)**2) for xi in x]
    plt.figure(figsize=(9, 5))
    plt.plot(x, y, color="blue")
    plt.grid(True)
    plt.xlabel("Odległość [m]")
    plt.ylabel("Wysokość [m]")
    plt.title("Trajektoria pocisku Warwolf")
    plt.tight_layout()
    plt.savefig("trajektoria.png", dpi=300)
    plt.close()

while True:
    proby += 1
    alfa_rad = math.radians(alfa)
    r = (v * math.cos(alfa_rad) / g) * (
        v * math.sin(alfa_rad) + math.sqrt((v * math.sin(alfa_rad))**2 + 2 * g * h)
    )
    if cel - 5 <= r <= cel + 5:
        print("Gratulacje! Cel trafiony")
        print(f"Liczba podejść: {proby}")
        zapisz_trajektorie(alfa, h, v, g)
        print("Zapisano wykres jako trajektoria.png")
        break
    else:
        dystans = cel - r
        print(f"Cel nietrafiony. Odległość od celu: {dystans}")
        alfa = int(input("Podaj nowy kąt pocisku: "))