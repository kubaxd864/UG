from simpful import *
import matplotlib.pyplot as plt

FS = FuzzySystem(show_banner=False)
S_1 = TriangleFuzzySet(0, 0, 5, term="poor")
S_2 = TriangleFuzzySet(0, 5, 10, term="good")
S_3 = TriangleFuzzySet(5, 10, 10, term="excellent")
FS.add_linguistic_variable("service", LinguisticVariable([S_1, S_2, S_3], universe_of_discourse=[0, 10]))

F_1 = TriangleFuzzySet(0, 0, 10, term="rancid")
F_2 = TriangleFuzzySet(0, 10, 10, term="delicious")
FS.add_linguistic_variable("food", LinguisticVariable([F_1, F_2], universe_of_discourse=[0, 10]))

T_1 = TriangleFuzzySet(0, 0, 10, term="cheap")
T_2 = TriangleFuzzySet(0, 15, 30, term="average")
T_3 = TriangleFuzzySet(20, 30, 30, term="generous")
FS.add_linguistic_variable("tip", LinguisticVariable([T_1, T_2, T_3], universe_of_discourse=[0, 30]))

r1 = "IF (service IS poor) OR (food IS rancid) THEN (tip IS cheap)"
r2 = "IF (service IS good) THEN (tip IS average)"
r3 = "IF (service IS excellent) OR (food IS delicious) THEN (tip IS generous)"
FS.add_rules([r1, r2, r3])

def plot_variables(fs):
    fig, ax = plt.subplots(2, 2, figsize=(10, 8))
    fs.plot_variable("service", ax=ax[0, 0])
    fs.plot_variable("food", ax=ax[0, 1])
    fs.plot_variable("tip", ax=ax[1, 0])
    ax[1, 1].axis("off")
    fig.tight_layout()
    plt.show()
    
dane_testowe = [(4, 8), (2, 3), (9, 9), (7, 5)]
print("--- Wyniki testów systemu rozmytego ---")
for obsluga, jedzenie in dane_testowe:
    FS.set_variable("service", obsluga)
    FS.set_variable("food", jedzenie)
    
    wynik = FS.Mamdani_inference(["tip"])
    napiwek_procent = wynik["tip"]
    
    print(f"Dane wejściowe: obsługa={obsluga}, jedzenie={jedzenie} -> Proponowany napiwek: {napiwek_procent:.2f}%")

plot_variables(FS)