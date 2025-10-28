package com.example.autowire.type;

public class Car {

    private Specification specification;
    private Specification specification_v2;

    public void setSpecification(Specification specification) {
        this.specification = specification;
    }

    public void setSpecification_v2(Specification specification_v2) {
        this.specification_v2 = specification_v2;
    }

    public void displayDetails() {
        System.out.println("Car Details [OG]: " + specification.toString());
        System.out.println("Car Details [V2]: " + specification_v2.toString());
    }
}