package com.ecommerce.project.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ecommerce.project.model.Category;

@Service
public class CategoryServiceImpl implements CategoryService {

    private List<Category> categories = new ArrayList<>();
    private Long nextID = 1L;

    @Override
    public List<Category> getAllCategories() {
        return this.categories;
    }

    @Override
    public void createCategory(Category category) {
        category.setCategoryID(nextID++);
        this.categories.add(category);
    }
}