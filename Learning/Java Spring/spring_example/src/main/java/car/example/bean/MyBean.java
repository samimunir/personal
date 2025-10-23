package car.example.bean;

public class MyBean {

    private String message;

    public void setMessage(String message) {
        this.message = message;
    }

    public void showMessage() {
        System.out.println("My Bean {message = " + message + "}");
    }

    @Override
    public String toString() {
        return "My Bean {message = " + message + "}";
    }
}