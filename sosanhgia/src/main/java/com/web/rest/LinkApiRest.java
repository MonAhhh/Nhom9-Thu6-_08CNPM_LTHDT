package com.web.rest;

import com.web.entity.Category;
import com.web.entity.LinkApi;
import com.web.repository.CategoryRepostitory;
import com.web.repository.LinkApiRepository;
import com.web.repository.LinkWebRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class LinkApiRest {

    @Autowired
    private LinkApiRepository linkApiRepository;

    @PostMapping("/admin/addapi")
    public void save(@RequestBody LinkApi linkApi){
        linkApiRepository.save(linkApi);
    }

    @GetMapping("/public/getApiByCategory")
    public List<LinkApi> findByCategory(@RequestParam("id") Long id){
        return linkApiRepository.findByCategory(id);
    }

    @GetMapping("/public/allApi")
    public List<LinkApi> findAll(){
        return linkApiRepository.findAll();
    }

    @GetMapping("/public/findApiById")
    public LinkApi findById(@RequestParam("id") Long id){
        return linkApiRepository.findById(id).get();
    }

    @DeleteMapping("/admin/deleteapi")
    public void deleteCategory(@RequestParam("id") Long id){
        linkApiRepository.deleteById(id);
    }

    @GetMapping("/public/findApiAscGet")
    public List<LinkApi> findAscGet(@RequestParam(value = "id", required = false) Long id){
        if(id == null){
            return linkApiRepository.findByAscGet();
        }
        return linkApiRepository.findByCategory(id);
    }
}
