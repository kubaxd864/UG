class Node:
    def __init__(self, x):
        self.key = x
        self.left = None
        self.right = None
        self.quantity = 1  
        self.left_count = 0 
        self.right_count = 0  

class BST:
    def __init__(self):
        self.root = None
    
    def insert_bst(self, root, key):
        if root is None:
            return Node(key)
        if key == root.key:
            root.quantity += 1
        elif key < root.key:
            root.left = self.insert_bst(root.left, key)
        else:
            root.right = self.insert_bst(root.right, key)
        root.left_count = self.count_nodes(root.left)
        root.right_count = self.count_nodes(root.right)
        return root

    def count_nodes(self, node):
        if node is None:
            return 0
        return 1 + self.count_nodes(node.left) + self.count_nodes(node.right)

    def build_bst(self, keys):
        self.root = None
        for key in keys:
            self.root = self.insert_bst(self.root, key)
        return self.root

    def szukaj(self, root, key):
        current = root
        while current:
            if key == current.key:
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
            if root.quantity > 1:
                root.quantity -= 1
                return root
            if root.left is None:
                return root.right
            elif root.right is None:
                return root.left
            temp = self.min(root.right)
            root.key = temp.key
            root.quantity = temp.quantity
            temp.quantity = 1
            root.right = self.usun(root.right, temp.key)
        root.left_count = self.count_nodes(root.left)
        root.right_count = self.count_nodes(root.right)
        return root

    def min(self, node):
        current = node
        while current and current.left:
            current = current.left
        return current

    def inorder(self, node):
        if node:
            self.inorder(node.left)
            print(f"{node.key} (qty={node.quantity}, left={node.left_count}, right={node.right_count})", end=' | ')
            self.inorder(node.right)

    def drukuj(self):
        print("Drzewo (inorder):")
        self.inorder(self.root)

bst = BST()
slowa = ["kot", "pies", "ala", "dom", "zebra", "koza", "kot", "pies", "ala", "kot"]
for slowo in slowa:
    bst.root = bst.insert_bst(bst.root, slowo)
bst.drukuj()

print("Szukaj 'kot':", bst.szukaj(bst.root, "kot"))
print("Szukaj 'pies':", bst.szukaj(bst.root, "pies"))
print("Szukaj 'lew':", bst.szukaj(bst.root, "lew"))

print("Usuwam 'kot'")
bst.root = bst.usun(bst.root, "kot")
bst.drukuj()
print("Usuwam 'kot'")
bst.root = bst.usun(bst.root, "kot")
bst.drukuj()
print("Usuwam 'kot'")
bst.root = bst.usun(bst.root, "kot")
bst.drukuj()