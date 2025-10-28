package com.zephiron.firstspring;

public class HelloResponse {

    private String message;

    public HelloResponse(String message) {
        this.message = message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}