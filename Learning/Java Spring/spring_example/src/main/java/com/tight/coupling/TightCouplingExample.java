package com.tight.coupling;

public class TightCouplingExample {  

    public static void main(String[] args) {
        UserManager userMNGR = new UserManager();
        System.out.println(userMNGR.getUserInfo());
    }
}