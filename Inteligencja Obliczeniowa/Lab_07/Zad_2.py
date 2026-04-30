import time
import numpy as np
import pygad
import math

metals = ["x", "y", "z", "u", "v", "w"]
num_genes = 6
gene_space = [{"low": 0.0, "high": 1.0}] * num_genes

def endurance(x, y, z, u, v, w):
    return math.exp(-2 * (y - math.sin(x)) ** 2) + math.sin(z * u) + math.cos(v * w)

def fitness_func(ga_instance, solution, solution_idx):
    x, y, z, u, v, w = solution
    return endurance(x, y, z, u, v, w)

def build_ga_instance(seed):
    return pygad.GA(
        gene_space=gene_space,
        num_generations=20,
        num_parents_mating=20,
        fitness_func=fitness_func,
        sol_per_pop=80,
        num_genes=num_genes,
        parent_selection_type="tournament",
        keep_elitism=2,
        crossover_type="uniform",
        mutation_type="random",
        mutation_percent_genes=20,  
        stop_criteria=["reach_2.83"],
        random_seed=seed,
    )

best_overall = None

for run_id in range(10):
    ga_instance = build_ga_instance(seed=run_id)

    start = time.time()
    ga_instance.run()
    elapsed = time.time() - start

    solution, solution_fitness, _ = ga_instance.best_solution()

    if best_overall is None or solution_fitness > best_overall["fitness"]:
        best_overall = {
            "solution": solution.copy(),
            "fitness": solution_fitness,
            "run": run_id + 1,
            "time": elapsed,
            "ga": ga_instance,
        }

print(f"Najlepsza proba nr: {best_overall['run']}")
print(f"Najlepsze geny [x,y,z,u,v,w]: {best_overall['solution']}")
print(f"Najlepsza wytrzymalosc (fitness): {best_overall['fitness']:.12f}")
print(f"Czas tej proby: {best_overall['time']:.6f} s")

best_overall["ga"].plot_fitness()