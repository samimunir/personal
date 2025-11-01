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

    private Long nextID = 1L;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return this.categoryRepository.findAll();
    }

    @Override
    public void createCategory(Category category) {
        category.setCategoryID(nextID++);
        this.categoryRepository.save(category);
    }

    @Override
    public String deleteCategory(Long categoryID) {
        List<Category> categories = this.categoryRepository.findAll();
        Category category = categories.stream()
            .filter(c -> c.getCategoryID()
            .equals(categoryID))
            .findFirst()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (category == null) {
            return "Category not found. Failed to delete.";
        }

        this.categoryRepository.delete(category);

        return "Category with categoryID[" + categoryID + "] deleted successfully.";
    }

    @Override
    public Category updateCategory(Category category, Long categoryID) {
        List<Category> categories = this.categoryRepository.findAll();
        Optional<Category> optionalCategory = categories.stream()
            .filter(c -> c.getCategoryID().equals(categoryID))
            .findFirst();

        if (optionalCategory.isPresent()) {
            Category existingCategory = optionalCategory.get();
            existingCategory.setCategoryName(category.getCategoryName());
            Category savedCategory = this.categoryRepository.save(existingCategory);
            return savedCategory;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found.");
        }
    }
}