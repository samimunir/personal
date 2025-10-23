package car.example.constructor.injection;

public class Specification {

    private String make;
    private String model;

    public void setMake(String make) {
        this.make = make;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String toString() {
        return "Specification {make = " + this.make + ", model = " + this.model + "}";
    }
}