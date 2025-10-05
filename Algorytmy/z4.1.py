class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class LinkedList:
    def __init__(self):
        self.head = None

    def wstaw(self, x):
        """Dodaje nowy element na początek listy."""
        new_node = Node(x)
        if self.head is None:
            self.head = new_node
        else:
            new_node.next = self.head
            self.head.prev = new_node
            self.head = new_node
    # funkcja wstaw ma złożoność czasową O(1)

    def drukuj(self):
        """Drukuje elementy listy."""
        currentNode = self.head
        while currentNode:
            print(currentNode.data, end=" -> ")
            currentNode = currentNode.next
        print("None")
    # funkcja drukuj ma złożoność czasową O(n)

    def szukaj(self, x):
        """Wyszukuje element w liście i zwraca węzeł."""
        currentNode = self.head
        while currentNode:
            if currentNode.data == x:
                return currentNode
            currentNode = currentNode.next
        return None
    # funkcja szukaj ma złożoność czasową O(n)

    def usuń(self, x):
        """Usuwa element z listy."""
        currentNode = self.head
        while currentNode:
            if currentNode.data == x:
                if currentNode.prev:
                    currentNode.prev.next = currentNode.next
                if currentNode.next:
                    currentNode.next.prev = currentNode.prev
                if currentNode == self.head:
                    self.head = currentNode.next
                return
            currentNode = currentNode.next

    def scal(list1, list2):
        """Scala dwie listy w nową listę."""
        nowa_lista = LinkedList()

        current = list1.head
        while current:
            nowa_lista.wstaw(current.data)
            current = current.next

        current = list2.head
        while current:
            nowa_lista.wstaw(current.data)
            current = current.next
        
        list1.head = None
        list2.head = None
        return nowa_lista

    def sortuj(self):
        """Sortuje listę za pomocą algorytmu z pivotem."""
        if not self.head or not self.head.next:
            return self

        pivot = self.head.data
        less_list = LinkedList()
        equal_list = LinkedList()
        greater_list = LinkedList()

        current = self.head
        while current:
            if current.data < pivot:
                less_list.wstaw(current.data)
            elif current.data == pivot:
                equal_list.wstaw(current.data)
            else:
                greater_list.wstaw(current.data)
            current = current.next

        less_list = less_list.sortuj()
        greater_list = greater_list.sortuj()

        sorted_list = LinkedList.scal(less_list, equal_list)
        sorted_list = LinkedList.scal(sorted_list, greater_list)

        return sorted_list

lista = LinkedList()
lista.wstaw(3)
lista.wstaw(6)
lista.wstaw(5)
lista.wstaw(1)
lista.wstaw(4)

lista2 = LinkedList()
lista2.wstaw(2)
lista2.wstaw(5)

lista.drukuj()
lista2.drukuj()

lista3 = LinkedList.scal(lista, lista2)
lista3.drukuj()

lista.drukuj()
lista2.drukuj()

