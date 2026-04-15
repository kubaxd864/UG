error id: file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-02-bst-gr-1-kubaxd864-main/Zad_2/Main.java:
file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-02-bst-gr-1-kubaxd864-main/Zad_2/Main.java
empty definition using pc, found symbol in pc: 
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 1445
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
            Node newNode = new Node(key);

            if (root == null) {
                root = newNode;
                return;
            }

            Node current = root;
            Node parent = null;

            while (current != null) {
                parent = current;
                if (key < current.key) {
                    current = current.left;
                } else if (key > current.key) {
                    current = current.right;
                } else {
                    return;
                }
            }

            if (key < parent.key) {
                parent.left = newNode;
            } else {
                parent.right = newNode;
            }
        }

        public void delete(int key) {
            Node parent = null;
            Node current = root;

            while (current != null && current.key != key) {
                parent = current;
                if (key < current.key) {
                    current = current.left;
                } else if(key@@ > current.key){
                    current = current.right;
                } else {
                    return;
                }
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