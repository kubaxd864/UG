def isMaxHeap(A):
    k = int((len(A)-2)/2)
    for i in range(0, k):
        l = 2*i+1 
        r = 2*i+2 
        if A[i] < A[l]:
            return False
        if A[i] < A[r]:
            return False
    return True

# A = [28, 23, 11, 18, 17, 8, 7, 12, 12, 14, 6]
# print(isMaxHeap(A))

def heapify(A, heapsize, i):
    l = 2*i+1
    r = 2*i+2
    largest = i
    if l < heapsize and A[l] > A[largest]:
        largest = l
    if r < heapsize and A[r] > A[largest]:
        largest = r
    if largest != i:
        A[i], A[largest] = A[largest], A[i]
        heapify(A, heapsize, largest)
    return A

def buildHeap(A):
    heapsize = len(A)
    k = int((heapsize-2)/2)
    for i in range(k, -1, -1):
        heapify(A, heapsize, i)
    return A

def heapSort(A):
    A = buildHeap(A)
    heapsize = len(A)
    for i in range(heapsize - 1, 0, -1):
        A[0], A[i] = A[i], A[0]
        heapsize -= 1
        heapify(A, heapsize, 0)
    return A

# B = [28, 23, 11, 8, 7, 20, 17, 14, 12, 12, 6]
# print(heapSort(B))


def partition(A, low, high):
    pivot = A[high]
    i = low
    for j in range(low, high):
        if A[j] < pivot:
            A[j], A[i] = A[i], A[j]
            i += 1
    A[i], A[high] = A[high], A[i]
    return i

def quicksort(A, low, high):
    if low < high:
        pi = partition(A, low, high)
        quicksort(A, low, pi - 1)
        quicksort(A, pi + 1, high)
    return A

# C = [28, 23, 11, 8, 7, 20, 17, 14, 12, 12, 13]
# print(quicksort(C, 0, len(C) - 1))
    
def mergesort(A):
    if len(A) <= 1:
        return A
    mid = len(A) // 2
    left = mergesort(A[:mid])
    right = mergesort(A[mid:])
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

# D = [28, 23, 11, 8, 7, 20, 17, 14, 12, 12, 13]
# print(mergesort(D))

class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

class Linkedlist: 
    def __init__(self):
        self.head = None
    
    def dodaj(self, item):
        new_node = Node(item)
        if self.head is None:
            self.head = new_node
        else:
            self.head.prev = new_node
            new_node.next = self.head
            self.head = new_node

    def wypisz(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")

    def szukaj(self, x):
        current = self.head
        while current:
            if current.data == x:
                return current
            current = current.next
        return None
    
    def usun(self, x):
        current = self.head
        while current:
            if current.data == x:
                if current == self.head:
                    self.head = current.next
                    if self.head:
                        self.head.prev = None
                elif current.next is None:
                    current.prev.next = None
                else:
                    current.prev.next = current.next
                    current.next.prev = current.prev
                break 
            current = current.next

# lista = Linkedlist()
# lista.dodaj(3)
# lista.dodaj(5)
# lista.dodaj(8)
# lista.dodaj(2)
# lista.wypisz()
# print(lista.szukaj(5))
# lista.usun(2)
# lista.wypisz()

def hash1(k, m):
    return k % m 

def hash2(k, m):
    return 1+(k % (m - 2))

# Wersja A adresowanie liniowe
def open_hashing_A(keys, m):
    t = ["_" for _ in range(m)]
    for key in keys:
        i = 0
        while i < m:
            place = (hash1(key, m)+i) % m
            if t[place] == '_':
                t[place] = key
                break
            i +=1 
    return t

# Wersja B adresowanie kwadratowe
def open_hashing_B(keys, m):
    t = ["_" for _ in range(m)]
    for key in keys:
        i = 0
        while i < m:
            place = (hash1(key, m)+i*i) % m
            if t[place] == '_':
                t[place] = key
                break
            i +=1 
    return t

# Wersja C adresowanie dwukrotne
def open_hashing_C(keys, m):
    t = ["_" for _ in range(m)]
    for key in keys:
        i = 0
        while i < m:
            place = (hash1(key, m)+i*hash2(key, m)) % m
            if t[place] == '_':
                t[place] = key
                break
            i +=1 
    return t

def delete_element(el, t):
    for i in range(len(t)):
        place = (hash1(el, 13)+i) % 13
        if t[place] == el:
            t[place] = "DEL"
            return t
        if t[place] == "_":
            return None

def find_element(el, m, t):
    for i in range(len(t)):
        place = (hash1(el, m)+i) % m
        if t[place] == el:
            return place
        if t[place] == '_':
            return None


# print(open_hashing_A([6,19,28,41,54], 13))
# t = open_hashing_A([6,19,28,41,54], 13)
# print(open_hashing_B([6,19,28,41,54], 13))
# print(open_hashing_C([6,19,28,41,54], 13))
# print(delete_element(19, t))
# print(find_element(28, 13, t))

class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None
    
class BST:
    def __init__(self):
        self.root = None

    def wstaw(self, start, x):
        if start is None:
            return Node(x)
        if x < start.data:
            start.left = self.wstaw(start.left, x)
        else:
            start.right = self.wstaw(start.right, x)
        return start

    def build_bst(self, keys):
        for key in keys:
            self.root = self.wstaw(self.root, key)
    
    def inorder(self, root):
        if root:
            self.inorder(root.left)
            print(root.data, end=" ")
            self.inorder(root.right)
    
    def preorder(self, root):
        if root:
            print(root.data, end=" ")
            self.inorder(root.left)
            self.inorder(root.right) 

    def szukaj(self, x):
        current = self.root
        while current:
            if current.data == x:
                return current
            elif x < current.data:
                current = current.left
            else:
                current = current.right
        return None
    
# drzewo = BST()
# drzewo.build_bst([7,15,6,8,13,5,9])
# print("Inorder")
# drzewo.inorder(drzewo.root)
# print("\n")
# print("Preorder")
# drzewo.preorder(drzewo.root)
# print("\n")
# print(drzewo.szukaj(8))

def tail(A): 
    return A[1:]

def head(A): 
    return A[0]

def Is_Empty(A):
    if len(A) == 0:
        return True
    return False

def parzyste(A):
    if Is_Empty(A):
        return 0
    if head(A) % 2 == 0:
        return 1 + parzyste(tail(A))
    else:
        return parzyste(tail(A))

def maks(A):
    if Is_Empty(A):
        return None
    elif Is_Empty(tail(A)):
        return head(A)
    else:
        if head(A) > maks(tail(A)):
            return head(A)
        else:
            return maks(tail(A)) 
        
print(parzyste([10, 2, 5, 4, 9, 12, 14]))
print(maks([10, 2, 5, 4, 9, 12, 14]))