matrix = [[1, 2, 3, 5], [2, 3, 5, 4], [0, 5, 4, 1], [3, 7, 2, 1], [1, 2, 1, 1, 2]]
dist_matrix = []
for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        if matrix[i][j] in dist_matrix:
            pass
        else:
            dist_matrix.append(matrix[i][j])
print(sorted(dist_matrix))