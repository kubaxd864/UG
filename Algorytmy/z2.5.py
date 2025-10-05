S = [2,4,2,5,6,3,4,8,9]

def parentIndex(x): 
   return (x - 1) // 2

def heapify(A, heapSize, i): 
 l = 2*i+1  
 r = 2*i+2 
 if l < heapSize and A[l] < A[i]: 
    largest = l 
 else: 
    largest = i 
 if r < heapSize and A[r] < A[largest]: 
    largest = r 
 if largest != i: 
    A[i], A[largest] = A[largest], A[i] 
    heapify(A, heapSize, largest) 
 return A 
# funkcja heapify ma złożoność czasową O(log n)

def buildHeap(A):
 heapSize = len(A) 
 k = int((len(A)-2)/2) 
 for i in range(k, -1, -1): 
    heapify(A, heapSize, i) 
 return A 
# funkcja buildHeap ma złożoność O(n)

def insert(S, x):
    S.append(x)
    i = len(S) - 1  
    while i > 0: 
        heapify(S, len(S), parentIndex(i)) 
        i = parentIndex(i) 
    return S
# funkcja insert ma złożoność czasową O((logn)^2)

def minimum(S):
    return S[0]
# funkcja ma złożoność O(1)

def extract_min(S):
    min_val = S[0]
    S.pop(0)
    i = len(S) - 1  
    while i > 0: 
        heapify(S, len(S), parentIndex(i)) 
        i = parentIndex(i) 
    return min_val, S
# funkcja insert ma złożoność czasową O(n) + O((logn)^2)

def decrease_key(S,x,k):
    if(k <= S[x]):
        S[x] = k
        i = len(S) - 1  
        while i > 0: 
            heapify(S, len(S), parentIndex(i)) 
            i = parentIndex(i) 
    return S

 
print(insert(S, 1))
# print(minimum(S))
# print(extract_min(S))
# print(decrease_key(S, 5, 4))