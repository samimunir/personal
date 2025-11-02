package com.ecommerce.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ecommerce.project.model.Category;
import com.ecommerce.project.repositories.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return this.categoryRepository.findAll();
    }

    @Override
    public void createCategory(Category category) {
        this.categoryRepository.save(category);
    }

    @Override
    public String deleteCategory(Long categoryID) {
        Category category = this.categoryRepository.findById(categoryID)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found."));

        this.categoryRepository.delete(category);

        return "Category with categoryID[" + categoryID + "] deleted successfully.";
    }

    @Override
    public Category updateCategory(Category category, Long categoryID) {
        Optional<Category> savedCategoryOptional = this.categoryRepository.findById(categoryID);

        // does the category exist or not (if null).
        Category savedCategory = savedCategoryOptional
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found."));

        category.setCategoryID(categoryID);
    
        savedCategory = this.categoryRepository.save(category);

        return savedCategory;
    }
}