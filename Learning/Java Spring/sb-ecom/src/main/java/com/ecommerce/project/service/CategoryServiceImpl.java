package com.ecommerce.project.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    @Override
    public String deleteCategory(Long categoryID) {
        Category category = this.categories.stream()
            .filter(c -> c.getCategoryID()
            .equals(categoryID))
            .findFirst()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (category == null) {
            return "Category not found. Failed to delete.";
        }

        this.categories.remove(category);

        return "Category with categoryID[" + categoryID + "] deleted successfully.";
    }
}