def heapify(A, heapSize, i):
    l = 2*i+1 
    r = 2*i+2 
    if l < heapSize and A[l] > A[i]:
        largest = l
    else:
        largest = i
    if r < heapSize and A[r] > A[largest]:
        largest = r
    if largest != i:
        A[i], A[largest] = A[largest], A[i]
        heapify(A, heapSize, largest)
    return A

def buildHeap(A):
    heapSize = len(A)
    k = int((len(A)-2)/2)
    for i in range(k, -1, -1):
        heapify(A, heapSize, i)
    return A

def heapSort(A):
    A = buildHeap(A)
    heapSize = len(A)
    for i in range(len(A)-1, 0, -1):
        A[0], A[heapSize-1] = A[heapSize-1], A[0]
        heapSize -= 1
        heapify(A,heapSize,0)
    return A

# def heapify(A, heapSize, i):
#     while True:
#         l = 2*i+1 
#         r = 2*i+2 
#         if l < heapSize and A[l] > A[i]:
#             largest = l
#         else:
#             largest = i
#         if r < heapSize and A[r] > A[largest]:
#             largest = r
#         if largest != i:
#             A[i], A[largest] = A[largest], A[i]
#             i = largest
#         else:
#             break
#     return A

# def buildHeap(A):
#     heapSize = len(A)
#     k = int((len(A)-2)/2)
#     for i in range(k, -1, -1):
#         heapify(A, heapSize, i)
#     return A

# def heapSort(A):
#     A = buildHeap(A)
#     heapSize = len(A)
#     for i in range(len(A)-1, 0, -1):
#         A[0], A[heapSize-1] = A[heapSize-1], A[0]
#         heapSize -= 1
#         heapify(A,heapSize,0)
#     return A

S = [1, 8, 5, 3, 6]
# print(buildHeap(S))
print(heapSort(S))