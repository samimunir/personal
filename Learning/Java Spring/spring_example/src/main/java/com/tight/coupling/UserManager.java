package com.tight.coupling;

public class UserManager {

    private UserDatabase userDB = new UserDatabase();

    public String getUserInfo() {
        return userDB.getUserDetails();
    }
}