error id: file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-02-bst-gr-1-kubaxd864-main/Zad_1/Main.java:Main#Node#[A]
file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-02-bst-gr-1-kubaxd864-main/Zad_1/Main.java
empty definition using pc, found symbol in pc: 
found definition using semanticdb; symbol Main#Node#[A]
empty definition using fallback
non-local guesses:

offset: 60
uri: file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-02-bst-gr-1-kubaxd864-main/Zad_1/Main.java
text:
```scala
public class Main {

    static class Node<A> {
        A@@ value;
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
        q.enqueue(45);
        q.enqueue(5);
        System.out.println(q.dequeue()); 
        System.out.println(q.dequeue()); 
        System.out.println(q.isEmpty()); 
        System.out.println(q.dequeue()); 
        System.out.println(q.isEmpty()); 
    }
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: 