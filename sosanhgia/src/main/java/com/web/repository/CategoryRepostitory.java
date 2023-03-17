package com.web.repository;

import com.web.entity.Category;
import com.web.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepostitory extends JpaRepository<Category,Long> {

    @Query("select c from Category c where c.cateParents.id = ?1")
    public List<Category> findByParent(Long id);
}
