import math, sys, random
from timeit import default_timer as timer
sys.setrecursionlimit(6000)

A = [23, 6, 11, 12, 17, 19, 7, 18, 12, 14, 15]
B = [1, 2, 3, 4, 5, 6, 7, 8, 9 , 10, 11, 12, 13]
C = [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3]

def partition(A, low, high):
    pivot = A[high]
    index = low
    for i in range(low, high):
        if A[i] <= pivot:
            A[i], A[index] = A[index], A[i]
            index += 1
    A[index], A[high] = A[high], A[index]
    return index
# funkcja partition ma złożoność czasową O(n)

def QuickSort(A, low, high):
    if low < high:
        q = partition(A, low, high)
        QuickSort(A, low, q - 1)
        QuickSort(A, q + 1, high)
    return A
# funkcja quicksort ma złożoność czasową O(n*log n)

print(QuickSort(A, 0, len(A) - 1))
# nn = [100000, 500000, 1000000]

# print("# Czasy dla Tabel Losowych #")
# for n in nn:
#     start = timer() 
#     QuickSort(A, 0 , len(A) - 1)
#     stop = timer()
#     Tn = stop - start
#     Fn= n * math.log(n)
#     print(n, Tn, Fn / Tn)
    
# print("# Czasy dla Tabeli Posortowanej Rosnąco #")
# for n in nn:
#     start = timer() 
#     QuickSort(B, 0 , len(B) - 1)
#     stop = timer()
#     Tn = stop - start
#     Fn= n * math.log(n)
#     print(n, Tn, Fn / Tn)

# print("# Czasy dla Tabeli Posortowanej Malejąco #")
# for n in nn:
#     start = timer() 
#     QuickSort(C, 0 , len(C) - 1)
#     stop = timer()
#     Tn = stop - start
#     Fn= n * math.log(n)
#     print(n, Tn, Fn / Tn)
