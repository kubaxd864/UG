public class Main {
    public static void main(String[] args) {
        Queue<Integer> q = new LinkedQueue<>();
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
