package com.ecommerce.project.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity(name = "categories")
public class Category {

    @Id
    private Long categoryID;
    private String categoryName;

    public Category(Long categoryID, String categoryName) {
        this.categoryID = categoryID;
        this.categoryName = categoryName;
    }

    public void setCategoryID(Long categoryID) {
        this.categoryID = categoryID;
    }

    public Long getCategoryID() {
        return this.categoryID;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryName() {
        return this.categoryName;
    }
}