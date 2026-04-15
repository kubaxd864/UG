public interface Queue<A> {
    void enqueue(A value);

    A dequeue();

    boolean isEmpty();
}
