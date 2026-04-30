import numpy as np
from matplotlib import pyplot as plt
import pyswarms as ps
from pyswarms.utils.plotters import plot_cost_history


def endurance(position):
	x = position[:, 0]
	y = position[:, 1]
	z = position[:, 2]
	u = position[:, 3]
	v = position[:, 4]
	w = position[:, 5]
	values = np.exp(-2 * (y - np.sin(x)) ** 2) + np.sin(z * u) + np.cos(v * w)
	return -values

options = {'c1': 0.5, 'c2': 0.3, 'w':0.9}
x_max = np.ones(6)
x_min = np.zeros(6)
my_bounds = (x_min, x_max)


optimizer = ps.single.GlobalBestPSO(n_particles=20, dimensions=6, options=options, bounds=my_bounds)
cost, pos = optimizer.optimize(endurance, iters=200)
cost_history = optimizer.cost_history

plot_cost_history(cost_history)
plt.show()