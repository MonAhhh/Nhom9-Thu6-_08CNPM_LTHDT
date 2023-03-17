package com.web.rest;

import com.web.entity.CateParents;
import com.web.entity.Category;
import com.web.repository.CateParentRepository;
import com.web.repository.CategoryRepostitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class CategoryRest {

    @Autowired
    private CategoryRepostitory categoryRepostitory;

    @PostMapping("/admin/addCategory")
    public void save(@RequestBody Category category){
        categoryRepostitory.save(category);
    }

    @GetMapping("/public/allCategory")
    public List<Category> findAll(){
        return categoryRepostitory.findAll();
    }

    @GetMapping("/public/findCategoryByParent")
    public List<Category> findByParent(@RequestParam("id") Long id){
        return categoryRepostitory.findByParent(id);
    }

    @GetMapping("/public/categoryById")
    public Category findById(@RequestParam("id") Long id){
        return categoryRepostitory.findById(id).get();
    }

    @DeleteMapping("/admin/deletecategory")
    public void deleteCategory(@RequestParam("id") Long id){
        categoryRepostitory.deleteById(id);
    }
}
