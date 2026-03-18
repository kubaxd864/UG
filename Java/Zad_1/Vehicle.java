package Zad_1;
import java.util.UUID;

public abstract class Vehicle {
    protected UUID ID;

    protected Vehicle() {
        this.ID = UUID.randomUUID();
    }

    public UUID getID() {
        return ID;
    }

    public abstract void start();
}