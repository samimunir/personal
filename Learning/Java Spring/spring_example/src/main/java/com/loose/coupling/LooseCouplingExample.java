package com.loose.coupling;

public class LooseCouplingExample {

    /*
     * Make use of an interface/abstract-class to promote loose coupling.
     * 
     * UserDataProvider interface sets the contract (interface -> class relationship).
     * 
     * Whoever implements the interface, can use the UserManager class by passing the interface implementation as a dependency.
     */

    public static void main(String[] args) {
        UserDataProvider dbProvider = new UserDatabaseProvider();
        UserManager userMNGR_db = new UserManager(dbProvider);
        System.out.println(userMNGR_db.getUserInfo());

        System.out.println();

        UserDataProvider wsProvider = new WebServiceProvider();
        UserManager userMNGR_ws = new UserManager(wsProvider);
        System.out.println(userMNGR_ws.getUserInfo());

        System.out.println();

        UserDataProvider mongoProvider = new MongoDBProvider();
        UserManager userMNGR_mdb = new UserManager(mongoProvider);
        System.out.println(userMNGR_mdb.getUserInfo());
    }
}