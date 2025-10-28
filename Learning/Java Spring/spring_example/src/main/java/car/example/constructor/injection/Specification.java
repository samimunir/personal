package car.example.constructor.injection;

public class Specification {

    private String make;
    private String model;

    public void setMake(String make) {
        this.make = make;
    }

    public String getMake() {
        return this.make;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getModel() {
        return this.model;
    }

    @Override
    public String toString() {
        return "Specification {make = " + make + ", model = " + model + "}";
    }
}