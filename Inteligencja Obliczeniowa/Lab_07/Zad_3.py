import time
import numpy as np
import pygad
import math

MAZE = np.array(
    [
        [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
        [1, 1, 0, 0, 0, 1, 0, 1, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 1, 1, 1, 0, 1, 1, 0],
        [0, 0, 1, 1, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [0, 1, 0, 0, 1, 1, 0, 1, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 1, 1, 0],
        [0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    dtype=np.int8,
)

START = (0, 0)
GOAL = (9, 9)
MOVE_DELTAS = {
    0: (-1, 0),
    1: (1, 0),
    2: (0, -1),
    3: (0, 1),
}

manhattan_distance = abs(START[0] - GOAL[0]) + abs(START[1] - GOAL[1])
num_genes = 3 * manhattan_distance
gene_space = [0, 1, 2, 3]

MIN_MUTATION_PERCENT = math.ceil(100 / num_genes)


def in_bounds(r, c):
    return 0 <= r < MAZE.shape[0] and 0 <= c < MAZE.shape[1]


def evaluate_solution(solution):
    r, c = START
    collisions = 0
    steps = 0
    reached_goal = False

    for move in solution:
        dr, dc = MOVE_DELTAS[int(move)]
        nr, nc = r + dr, c + dc

        if not in_bounds(nr, nc) or MAZE[nr, nc] == 1:
            collisions += 1
            continue

        r, c = nr, nc
        steps += 1

        if (r, c) == GOAL:
            reached_goal = True
            break

    distance_to_goal = abs(r - GOAL[0]) + abs(c - GOAL[1])
    goal_bonus = 1000 if reached_goal else 0
    fitness = goal_bonus - 5 * distance_to_goal - 2 * collisions - 0.2 * steps

    return {
        "fitness": fitness,
        "reached_goal": reached_goal,
        "collisions": collisions,
        "distance_to_goal": distance_to_goal,
        "steps": steps,
    }


def fitness_func(ga_instance, solution, solution_idx):
    return evaluate_solution(solution)["fitness"]


def build_ga_instance(seed, population_size, mutation_percent):
    return pygad.GA(
        gene_space=gene_space,
        num_generations=20,
        num_parents_mating=20,
        fitness_func=fitness_func,
        sol_per_pop=population_size,
        num_genes=num_genes,
        parent_selection_type="tournament",
        keep_elitism=2,
        crossover_type="uniform",
        mutation_type="random",
        mutation_percent_genes=mutation_percent,
        stop_criteria=["reach_995"],
        random_seed=seed,
    )


def pretty_moves(solution):
    return "".join("GDLP"[int(g)] for g in solution)

best_overall = None
successes = 0
run_times = []
config_schedule = [
    (60, MIN_MUTATION_PERCENT),
    (90, MIN_MUTATION_PERCENT + 1),
    (130, MIN_MUTATION_PERCENT + 2),
]
TOTAL_RUNS = 10

for run_id in range(TOTAL_RUNS):
    cfg_idx = min(run_id // 4, len(config_schedule) - 1)
    population_size, mutation_percent = config_schedule[cfg_idx]
    print(
        f"\nProba {run_id + 1}/{TOTAL_RUNS}: "
        f"populacja={population_size}, mutacja={mutation_percent}%"
    )

    ga_instance = build_ga_instance(
        seed=run_id,
        population_size=population_size,
        mutation_percent=mutation_percent,
    )

    start = time.time()
    ga_instance.run()
    elapsed = time.time() - start
    run_times.append(elapsed)

    solution, solution_fitness, _ = ga_instance.best_solution()
    sim = evaluate_solution(solution)

    if best_overall is None or solution_fitness > best_overall["fitness"]:
        best_overall = {
            "solution": solution.copy(),
            "fitness": solution_fitness,
            "run": run_id + 1,
            "time": elapsed,
            "ga": ga_instance,
            "sim": sim,
            "population": population_size,
            "mutation": mutation_percent,
        }

    if sim["reached_goal"]:
        successes += 1

print(f"Najlepsza proba nr: {best_overall['run']}")
print(f"Ustawienia: populacja = {best_overall['population']}, mutacja={best_overall['mutation']}%")
print(f"Najlepszy wynik: {best_overall['fitness']:.3f}")
print(f"Czas tej proby: {best_overall['time']:.6f} s")
print(f"Kolizje: {best_overall['sim']['collisions']}")
print(f"Dystans do mety: {best_overall['sim']['distance_to_goal']}")
print(f"Wykonane kroki: {best_overall['sim']['steps']}")
print(f"Sekwencja wykonanych ruchow: {pretty_moves(best_overall['solution'])}")
print(f"Skuteczność: {100.0 * successes / TOTAL_RUNS:.1f}%")
print(f"Sredni czas z {TOTAL_RUNS} uruchomien: {np.mean(run_times):.6f} s")

if successes == 0:
    print("Uwaga: w zadnej probie nie osiagnieto mety.")

best_overall["ga"].plot_fitness()