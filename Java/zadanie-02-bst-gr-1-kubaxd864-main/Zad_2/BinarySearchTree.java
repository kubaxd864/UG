import java.util.LinkedList;
import java.util.Queue;

public class BinarySearchTree implements SearchTree {
    private Node root;

    private static class Node {
        private int key;
        private Node left;
        private Node right;

        Node(int key) {
            this.key = key;
        }
    }

    @Override
    public void insert(int key) {
        if (root == null) {
            root = new Node(key);
            return;
        }

        Node current = root;

        while (current != null) {
            if (key < current.key) {
                if (current.left == null) {
                    current.left = new Node(key);
                    return;
                }
                current = current.left;
            } else if (key > current.key) {
                if (current.right == null) {
                    current.right = new Node(key);
                    return;
                }
                current = current.right;
            } else {
                return;
            }
        }
    }

    @Override
    public void delete(int key) {
        Node parent = null;
        Node current = root;

        while (current != null && current.key != key) {
            parent = current;
            if (key < current.key) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        if (current == null) {
            return;
        }

        if (current.left != null && current.right != null) {
            Node successorParent = current;
            Node successor = current.right;

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

    @Override
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
