import numpy as np

A = np.array([[12.2, -10, -2.2], [-10, 14.7, -4.7], [2.2, 4.7, 7.9]])
B = np.array([5, 15, 10])

X = np.linalg.solve(A, B)
print(f"Rozwiązanie to: {X}")
