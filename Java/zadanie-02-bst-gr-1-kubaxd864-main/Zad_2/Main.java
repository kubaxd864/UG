public class Main {
    public static void main(String[] args) {
        SearchTree tree = new BinarySearchTree();

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
