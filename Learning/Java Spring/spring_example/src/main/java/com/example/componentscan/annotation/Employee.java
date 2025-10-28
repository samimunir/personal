package com.example.componentscan.annotation;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

// Annotate the class as a Spring component with the name "employee"
@Component("employee")
public class Employee {

    @Value("001")
    private int employeeID;

    @Value("John")
    private String firstName;

    @Value("Doe")
    private String lastName;

    @Value("100000.0")
    private double salary;

    public void setEmployeeID(int employeeID) {
        this.employeeID = employeeID;
    }

    public int getEmployeeID() {
        return this.employeeID;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public double getSalary() {
        return this.salary;
    }

    @Override
    public String toString() {
        return "Employee {employeeID = " + employeeID + ", firstName = " + firstName + ", lastName = " + lastName + ", salary = " + salary + "}";
    }
}