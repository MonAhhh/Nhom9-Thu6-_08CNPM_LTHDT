package com.web.repository;

import com.web.entity.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog,Long> {

    @Query(value = "select * from blog order by id desc", nativeQuery = true)
    public Page<Blog> getAllBlog(Pageable pageable);

    @Query(value = "select * from blog where title like ?1 or description like ?1 order by id desc", nativeQuery = true)
    public Page<Blog> getAllBlogSearch(String s, Pageable pageable);

    @Query(value = "select * from blog limit 8", nativeQuery = true)
    public List<Blog> findHomePage();


}
