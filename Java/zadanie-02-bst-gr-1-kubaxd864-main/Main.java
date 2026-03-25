public class Main {

    static class Node<A> {
        A value;
        Node<A> next;

        Node(A value) {
            this.value = value;
            this.next = null;
        }
    }

    static class Queue<A> {
        Node<A> head;

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

        public A dequeue() {
            if (isEmpty()) {
                throw new IllegalStateException("Queue is empty");
            }

            A value = head.value;
            head = head.next;
            return value;
        }

        public boolean isEmpty() {
            return head == null;
        }
    }

    public static void main(String[] args) {
        Queue<Integer> q = new Queue<>();

        q.enqueue(10);
        q.enqueue(20);
        q.enqueue(30);

        System.out.println(q.dequeue()); // 10
        System.out.println(q.dequeue()); // 20
        System.out.println(q.isEmpty()); // false
        System.out.println(q.dequeue()); // 30
        System.out.println(q.isEmpty()); // true
    }
}
