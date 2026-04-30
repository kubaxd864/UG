import time
import numpy as np
import pygad

items = [
    "zegar",
    "obraz-pejzaz",
    "obraz-portret",
    "radio",
    "laptop",
    "lampka nocna",
    "srebrne sztucce",
    "porcelana",
    "figura z brazu",
    "skorzana torebka",
    "odkurzacz",
]
values = np.array([100, 300, 200, 40, 500, 70, 100, 250, 300, 280, 300], dtype=np.int32)
weights = np.array([7, 7, 6, 2, 5, 6, 1, 3, 10, 3, 15], dtype=np.int32)
capacity = 25
target_value = 1630
gene_space = [0, 1]
num_genes = len(items)


def fitness_func(ga_instance, solution, solution_idx):
    total_weight = np.dot(solution, weights)
    total_value = np.dot(solution, values)

    if total_weight > capacity:
        return total_value - 1000 * (total_weight - capacity)
    return total_value


def build_ga_instance(seed):
    return pygad.GA(
        gene_space=gene_space,
        num_generations=15,
        num_parents_mating=20,
        fitness_func=fitness_func,
        sol_per_pop=80,
        num_genes=num_genes,
        parent_selection_type="tournament",
        keep_elitism=2,
        crossover_type="uniform",
        mutation_type="random",
        mutation_percent_genes=5,
        stop_criteria=[f"reach_{target_value}"],
        random_seed=seed,
    )


best_overall = None
successes = 0
success_times = []

for run_id in range(10):
    ga_instance = build_ga_instance(seed=run_id)

    start = time.time()
    ga_instance.run()
    elapsed = time.time() - start

    solution, solution_fitness, _ = ga_instance.best_solution()
    total_weight = np.dot(solution, weights)
    total_value = np.dot(solution, values)

    if best_overall is None or total_value > best_overall["value"]:
        best_overall = {
            "solution": solution.copy(),
            "fitness": solution_fitness,
            "weight": total_weight,
            "value": total_value,
            "run": run_id + 1,
            "ga": ga_instance,
        }

    if total_value >= target_value and total_weight <= capacity:
        successes += 1
        success_times.append(elapsed)

print(f"Najlepsza proba nr: {best_overall['run']}")
print(f"Najlepsze ustawienie: {best_overall['solution']}")
print(f"Wartość plecaka: {best_overall['value']}")
print(f"Łaczna waga: {best_overall['weight']} / {capacity}")

success_percent = 100.0 * successes / 10
print(f"Skutecznosc (10 uruchomien): {success_percent:.1f}%")

if success_times:
    print(f"Sredni czas dla udanych prob: {np.mean(success_times):.6f} s")
else:
    print("Brak udanych prob, sredni czas nie jest liczony.")

best_overall["ga"].plot_fitness()