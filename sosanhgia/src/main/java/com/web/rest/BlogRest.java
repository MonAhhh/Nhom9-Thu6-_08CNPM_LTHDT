package com.web.rest;

import com.web.entity.Blog;
import com.web.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class BlogRest {

    @Autowired
    private BlogRepository blogRepository;

    @GetMapping("/public/allBlog")
    public List<Blog> findAll(){
        return blogRepository.findAll();
    }

    @GetMapping("/public/allBlogPage")
    public Page<Blog> findAll(Pageable pageable, @RequestParam(value = "search", required = false) String search){
        System.out.println("search: "+search);
        if(search == null){
            return blogRepository.getAllBlog(pageable);
        }
        else{
            return blogRepository.getAllBlogSearch("%"+search+"%",pageable);
        }
    }

    @GetMapping("/public/getBlogById")
    public Blog findById(@RequestParam("id") Long id){
        return blogRepository.findById(id).get();
    }

    @PostMapping("/admin/saveOrUpdateBlog")
    public Blog saveOrUpdate(@RequestBody Blog blog){
        if(blog.getId() != null){
            Blog b = blogRepository.findById(blog.getId()).get();
            blog.setCreatedDate(b.getCreatedDate());
        }
        else{
            blog.setCreatedDate(new Date(System.currentTimeMillis()));
        }
        return blogRepository.save(blog);
    }

    @DeleteMapping("/admin/deleteBlog")
    public void saveOrUpdate(@RequestParam("id") Long id){
        blogRepository.deleteById(id);
    }

    @GetMapping("/public/bloghomepage")
    public List<Blog> getInhomePage(){
        return blogRepository.findHomePage();
    }

    @GetMapping("/public/allblog")
    public Page<Blog> findAllPage(Pageable pageable){
        return blogRepository.getAllBlog(pageable);
    }
}
