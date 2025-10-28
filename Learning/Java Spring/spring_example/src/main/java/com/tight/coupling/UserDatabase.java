package com.tight.coupling;

public class UserDatabase {

    // Directly access database here.

    /*
     * A - MySQL, PostgreSQL, MongoDB, etc...
     * B - WebService, API, etc...
     * 
     * This is tight coupling (if there is a change in DB, we need to change a lot of code in UserManager & this class).
     */

    public String getUserDetails() {
        return "User details from the UserDatabase.";
    }
}