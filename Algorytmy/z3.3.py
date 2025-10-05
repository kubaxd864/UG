import os
test_input = "pesel.txt"
output_dir = "pesel_chunks"

def sort_and_save_chunk(lines, chunk_index, output_dir):
    """Sortuje fragment i zapisuje do pliku w folderze docelowym"""
    os.makedirs(output_dir, exist_ok=True) 
    temp_file_path = os.path.join(output_dir, f"chunk_{chunk_index}.txt")
    with open(temp_file_path, 'w', encoding='utf-8') as temp_file:
        temp_file.writelines("\n".join(mergeSort(lines)) + "\n")  
    return temp_file_path

def split_large_file(input_file, output_dir, chunk_size=100000):
    """Dzieli duży plik na mniejsze fragmenty"""
    temp_files = []
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = []
        chunk_index = 0
        for line in f:
            lines.append(line.strip())
            if len(lines) >= chunk_size:
                temp_files.append(sort_and_save_chunk(lines, chunk_index, output_dir))
                lines = []
                chunk_index += 1
        if lines:
            temp_files.append(sort_and_save_chunk(lines, chunk_index, output_dir))
    return temp_files


def mergeSort(arr):
    """Dzieli tablicę na dwie części i następnie je sortuje"""
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    leftHalf = arr[:mid]
    rightHalf = arr[mid:]
    sortedLeft = mergeSort(leftHalf)
    sortedRight = mergeSort(rightHalf)
    return merge(sortedLeft, sortedRight)
# funkcja mergeSort ma złożoność czasową O(log n)

def merge(left, right):
    """Łączy ze sobą dwie posortowane tablice"""
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
# funkcja mergeSort ma złożoność czasową O(n)

split_large_file(test_input, output_dir) 