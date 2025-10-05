class Node:
    def __init__(self, x):
        self.key = x
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None
    
    def insert_bst(self, root, key):
        if root is None:
            return Node(key)
        if key < root.key:
            root.left = self.insert_bst(root.left, key)
        else:
            root.right = self.insert_bst(root.right, key)
        return root

    def build_bst(self, keys):
        self.root = None
        for key in keys:
            self.root = self.insert_bst(self.root, key)
        return self.root

    def inorder(self, node):
        if node:
            self.inorder(node.left)
            print(node.key, end=' ')
            self.inorder(node.right)

    def preorder(self, node):
        if node:
            print(node.key, end=' ')
            self.preorder(node.left)
            self.preorder(node.right)
    
    def postorder(self, node):
        if node:
            self.postorder(node.left)
            self.postorder(node.right)
            print(node.key, end=' ')
    
    def find_predecessor_successor(root, key):
        predecessor = None
        successor = None
        current = root
        while current:
            if key < current.key:
                successor = current
                current = current.left
            elif key > current.key:
                predecessor = current
                current = current.right
            else:
                if current.left:
                    temp = current.left
                    while temp.right:
                        temp = temp.right
                    predecessor = temp
                if current.right:
                    temp = current.right
                    while temp.left:
                        temp = temp.left
                    successor = temp
                break
        return predecessor, successor
    
    def min(self, node):
        if node is None:
            return None
        current = node
        while current.left:
            current = current.left
        return current
    
    def max(self):
        current = self.root
        if current is None:
            return None
        while current.right:
            current = current.right
        return current
    
    def szukaj(root, key):
        current = root
        while current:
            if current.key == key:
                return current
            elif key < current.key:
                current = current.left
            else:
                current = current.right
        return None
    
    def usun(self, root, key):
        if root is None:
            return None
        if key < root.key:
            root.left = self.usun(root.left, key)
        elif key > root.key:
            root.right = self.usun(root.right, key)
        else:
            # Jeden Syn
            if root.left is None:
                return root.right
            elif root.right is None:
                return root.left
            # Dwoje dzieci
            temp = self.min(root.right)
            root.key = temp.key
            root.right = self.usun(root.right, temp.key)
        return root


bst = BST()
liczby = [15, 5, 16, 3, 12, 20, 10, 34, 13, 8, 24, 18]
add_keys = [14, 19, 23, 6, 7]
bst.build_bst(liczby)
print("Inorder:")
bst.inorder(bst.root)
print("\n")
# print("\nPreorder")
# bst.preorder(bst.root)
# print("\nPostorder")
# bst.postorder(bst.root)
# for key in add_keys:
#     bst.insert_bst(bst.root, key)
# bst.inorder(bst.root)

# pred, succ = BST.find_predecessor_successor(bst.root, 15)
# print(f"\nPoprzednik 15: {pred.key}")
# print(f"Następnik 15: {succ.key}")

# print(f"Najmniejszy element {bst.min(bst.root).key}")
print(f"Największy element {bst.max().key}")
bst.root = bst.usun(bst.root, 15)
bst.preorder(bst.root)