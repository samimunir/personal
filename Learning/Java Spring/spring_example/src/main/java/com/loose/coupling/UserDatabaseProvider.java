package com.loose.coupling;

public class UserDatabaseProvider implements UserDataProvider {

    // Directly access database here.

    @Override
    public String getUserDetails() {
        return "User details from the UserDBProvider.";
    }
}