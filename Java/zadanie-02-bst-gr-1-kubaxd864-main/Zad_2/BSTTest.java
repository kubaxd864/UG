import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class BSTTest {

    @Test
    void bfsAfterInsertShouldKeepLevelOrder() {
        SearchTree tree = new BinarySearchTree();

        tree.insert(10);
        tree.insert(5);
        tree.insert(20);
        tree.insert(15);
        tree.insert(30);

        assertEquals("10 5 20 15 30", tree.bfs());
    }

    @Test
    void deleteNodeWithTwoChildrenShouldKeepValidStructure() {
        SearchTree tree = new BinarySearchTree();

        tree.insert(10);
        tree.insert(5);
        tree.insert(20);
        tree.insert(15);
        tree.insert(30);

        tree.delete(20);

        assertEquals("10 5 30 15", tree.bfs());
    }

    @Test
    void deleteRootShouldPromoteChild() {
        SearchTree tree = new BinarySearchTree();

        tree.insert(10);
        tree.insert(5);

        tree.delete(10);

        assertEquals("5", tree.bfs());
    }

    @Test
    void deletingMissingValueShouldNotChangeTree() {
        SearchTree tree = new BinarySearchTree();

        tree.insert(10);
        tree.insert(5);
        tree.insert(20);

        tree.delete(999);

        assertEquals("10 5 20", tree.bfs());
    }
}
