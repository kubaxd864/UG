public class LinkedQueue<A> implements Queue<A> {
    private Node<A> head;

    private static class Node<T> {
        private final T value;
        private Node<T> next;

        Node(T value) {
            this.value = value;
            this.next = null;
        }
    }

    @Override
    public void enqueue(A value) {
        Node<A> newNode = new Node<>(value);

        if (head == null) {
            head = newNode;
            return;
        }

        Node<A> current = head;
        while (current.next != null) {
            current = current.next;
        }
        current.next = newNode;
    }

    @Override
    public A dequeue() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue is empty");
        }

        A value = head.value;
        head = head.next;
        return value;
    }

    @Override
    public boolean isEmpty() {
        return head == null;
    }
}
