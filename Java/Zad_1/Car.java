package Zad_1;

public class Car extends Vehicle implements Drivable{
	@Override
	public void start() {
		System.out.println("Starting Car: " + getID());
	}

	@Override
	public void drive() {
        System.out.println("Car is driving on the road");
    }
}
