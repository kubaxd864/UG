error id: file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-02-bst-gr-1-kubaxd864-main/Zad_2/Main.java:local8
file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-02-bst-gr-1-kubaxd864-main/Zad_2/Main.java
empty definition using pc, found symbol in pc: 
found definition using semanticdb; symbol local8
empty definition using fallback
non-local guesses:

offset: 1465
uri: file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-02-bst-gr-1-kubaxd864-main/Zad_2/Main.java
text:
```scala
import java.util.LinkedList;
import java.util.Queue;

public class Main {

    static class Node {
        int key;
        Node left;
        Node right;

        Node(int key) {
            this.key = key;
            this.left = null;
            this.right = null;
        }
    }

    static class BST {
        Node root;

        public void insert(int key) {
            root = insertRec(root, key);
        }

        private Node insertRec(Node node, int key) {
            if (node == null) {
                return new Node(key);
            }

            if (key < node.key) {
                node.left = insertRec(node.left, key);
            } else if (key > node.key) {
                node.right = insertRec(node.right, key);
            }
            return node;
        }

        public void delete(int key) {
            Node parent = null;
            Node current = root;
            
            while (current != null && current.key != key) {
                parent = current;
                if (key < current.key) {
                    current = current.left;
                } else if (key > current.key) {
                    current = current.right;
                } else {
                    return;
                }
            }

            if (current.left != null && current.right != null) {
                Node successorParent = current;
                Node successor@@ = current.right;

                while (successor.left != null) {
                    successorParent = successor;
                    successor = successor.left;
                }

                current.key = successor.key;
                parent = successorParent;
                current = successor;
            }

            Node child = (current.left != null) ? current.left : current.right;

            if (parent == null) {
                root = child;
            } else if (parent.left == current) {
                parent.left = child;
            } else {
                parent.right = child;
            }
        }

        public String bfs() {
            if (root == null) {
                return "";
            }

            Queue<Node> queue = new LinkedList<>();
            StringBuilder result = new StringBuilder();
            queue.offer(root);

            while (!queue.isEmpty()) {
                Node current = queue.poll();
                result.append(current.key).append(" ");

                if (current.left != null) {
                    queue.offer(current.left);
                }
                if (current.right != null) {
                    queue.offer(current.right);
                }
            }

            return result.toString().trim();
        }
    }

    public static void main(String[] args) {
        BST tree = new BST();

        tree.insert(10);
        tree.insert(5);
        tree.insert(20);
        tree.insert(15);
        tree.insert(30);

        System.out.println("BFS: " + tree.bfs());
        tree.delete(20);
        System.out.println("BFS: " + tree.bfs());
    }
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: 