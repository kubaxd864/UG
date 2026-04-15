import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class QueueTest {

    @Test
    void testFifoOrder() {
        Queue<Integer> queue = new LinkedQueue<>();
        queue.enqueue(10);
        queue.enqueue(45);
        queue.enqueue(5);

        assertEquals(10, queue.dequeue(), "First dequeue should return first inserted element");
        assertEquals(45, queue.dequeue(), "Second dequeue should return second inserted element");
        assertEquals(5, queue.dequeue(), "Third dequeue should return third inserted element");
    }

    @Test
    void testIsEmptyTransitions() {
        Queue<Integer> queue = new LinkedQueue<>();
        assertTrue(queue.isEmpty(), "Queue should be empty initially");

        queue.enqueue(1);
        assertFalse(queue.isEmpty(), "Queue should not be empty after enqueue");

        queue.dequeue();
        assertTrue(queue.isEmpty(), "Queue should be empty after removing all elements");
    }

    @Test
    void testDequeueOnEmptyThrows() {
        Queue<Integer> queue = new LinkedQueue<>();

        IllegalStateException ex = assertThrows(
                IllegalStateException.class,
                queue::dequeue,
                "Expected IllegalStateException for dequeue on empty queue"
        );
        assertEquals("Queue is empty", ex.getMessage(), "Exception message should match");
    }

    @Test
    void testGenericTypeSupport() {
        Queue<String> queue = new LinkedQueue<>();
        queue.enqueue("A");
        queue.enqueue("B");

        assertEquals("A", queue.dequeue(), "Queue should support String values");
        assertEquals("B", queue.dequeue(), "Queue should preserve order for String values");
    }
}
