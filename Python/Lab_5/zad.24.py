matrix = [[3, 4, 4, 5], 
          [2, 1, 6, 7], 
          [4, 3, 5, 6]]

def transpose_matrix(matrix):
    return [[matrix[j][i] for j in range(len(matrix))] for i in range(len(matrix[0]))]

transposed_matrix = transpose_matrix(matrix)
print(transposed_matrix)