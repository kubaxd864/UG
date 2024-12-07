matrix = [[3, 4], [4, 5], [2, 1], [6, 7]]
skalar = 3
for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        matrix[i][j] = matrix[i][j] * skalar
print(matrix)