package com.loose.coupling;

public class UserManager {

    private UserDataProvider userDP;

    public UserManager(UserDataProvider userDataProvider) {
        this.userDP = userDataProvider; 
    }

    public String getUserInfo() {
        return this.userDP.getUserDetails();
    }
}