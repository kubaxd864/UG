package Zad_1;

public class Motorcycle extends Vehicle implements Drivable{
  	@Override
	public void start() {
		System.out.println("Starting Motorcycle: " + getID());
	}

	@Override
	public void drive() {
		System.err.println("Driving a Motorcycle");
	}
}
