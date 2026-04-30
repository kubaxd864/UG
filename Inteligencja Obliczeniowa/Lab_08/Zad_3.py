import numpy as np
import matplotlib.pyplot as plt
plt.style.use("dark_background")


def is_valid(pos, grid, height, width):
    r, c = pos
    return (0 <= r < height and 0 <= c < width and grid[r][c] == 0)

def get_neighbors(pos, grid, height, width):
    r, c = pos
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    return [
        (r + dr, c + dc) for dr, dc in directions
        if is_valid((r + dr, c + dc), grid, height, width)
    ]

def manhattan_distance(pos, goal):
    return abs(pos[0] - goal[0]) + abs(pos[1] - goal[1])


def build_ant_path(start, goal, grid, height, width, pheromones, alpha=1.0, beta=2.0):
    path = [start]
    current = start
    visited = {start}
    
    for _ in range(height * width):
        if current == goal:
            return path
        
        neighbors = get_neighbors(current, grid, height, width)
        unvisited = [n for n in neighbors if n not in visited]
        
        if not unvisited:
            return None
        probs = []
        for neighbor in unvisited:
            edge = (current, neighbor)
            pheromone = pheromones.get(edge, 1.0)
            heuristic = 1.0 / (1.0 + manhattan_distance(neighbor, goal))
            prob = (pheromone ** alpha) * (heuristic ** beta)
            probs.append(prob)
        
        probs = np.array(probs)
        probs /= probs.sum()
        
        current = unvisited[np.random.choice(len(unvisited), p=probs)]
        path.append(current)
        visited.add(current)
    
    return None

def solve_aco(grid, start, goal, n_ants=50, alpha=1.0, beta=2.0, 
              evaporation=0.95, pheromone_deposit=1.0, iterations=100):

    height, width = len(grid), len(grid[0])
    pheromones = {}

    for r in range(height):
        for c in range(width):
            if grid[r][c] == 0:
                pos = (r, c)
                for neighbor in get_neighbors(pos, grid, height, width):
                    pheromones[(pos, neighbor)] = 1.0
    
    best_path = None
    best_length = float('inf')
    history = []
    
    for iteration in range(iterations):
        paths = [build_ant_path(start, goal, grid, height, width, pheromones, alpha, beta)
                 for _ in range(n_ants)]
        for path in paths:
            if path and len(path) < best_length:
                best_length = len(path)
                best_path = path

        for edge in pheromones:
            pheromones[edge] *= evaporation

        for path in paths:
            if path:
                reward = pheromone_deposit / len(path)
                for i in range(len(path) - 1):
                    edge = (path[i], path[i+1])
                    if edge in pheromones:
                        pheromones[edge] += reward
        
        successful = sum(1 for p in paths if p is not None)
        history.append((iteration, best_length, successful))
        
        if iteration % 20 == 0:
            print(f"Iteracja {iteration}: Długość = {best_length}, "
                  f"Udane = {successful}/{n_ants}")
    
    return best_path, history

def plot_maze(grid, start, goal, path=None):
    fig, ax = plt.subplots(figsize=(10, 9))
    maze_display = np.array(grid).astype(float)
    ax.imshow(maze_display, cmap='binary', alpha=0.3)

    ax.plot(start[1], start[0], 'go', markersize=15, label='Start')
    ax.plot(goal[1], goal[0], 'r*', markersize=20, label='Cel')

    if path:
        path_arr = np.array(path)
        ax.plot(path_arr[:, 1], path_arr[:, 0], 'cyan', linewidth=2, 
                label=f'Ścieżka (dł={len(path)})')
        ax.scatter(path_arr[:, 1], path_arr[:, 0], c='cyan', s=20, alpha=0.5)
    
    ax.set_title('Graficzne rozwiązanie labiryntu', fontsize=16, fontweight='bold')
    ax.legend(loc='upper right')
    ax.grid(True, alpha=0.2)
    return fig

if __name__ == "__main__":
    maze_grid = [
        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    
    start = (0, 0)
    goal = (8, 9)
    height, width = len(maze_grid), len(maze_grid[0])
    
    print(f"Labirynt: {height}x{width}")
    print(f"Start: {start} → Cel: {goal}")
    print(f"Dystans Manhattan: {manhattan_distance(start, goal)} kroków")
    
    path, history = solve_aco(maze_grid, start, goal, n_ants=50, alpha=1.0, beta=2.0, evaporation=0.95, pheromone_deposit=1.0, iterations=100)
    
    print("\n" + "="*70)
    if path:
        print(f"ROZWIĄZANIE: ")
        print(f"Rzeczywista długość: {len(path)} kroków")
        print(f"Minimum kroków: {manhattan_distance(start, goal)} kroków")
        print(f"Różnica: {len(path) - manhattan_distance(start, goal)} kroków")
    else:
        print("Brak rozwiązań")
    print("="*70)
    fig = plot_maze(maze_grid, start, goal, path)
    plt.show()

