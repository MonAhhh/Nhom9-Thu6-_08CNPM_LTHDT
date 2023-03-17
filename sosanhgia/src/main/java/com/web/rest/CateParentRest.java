package com.web.rest;

import com.web.entity.CateParents;
import com.web.repository.CateParentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class CateParentRest {

    @Autowired
    private CateParentRepository cateParentRepository;

    @PostMapping("/admin/addCateparent")
    public void save(@RequestBody CateParents cateParents){
        cateParentRepository.save(cateParents);
    }

    @GetMapping("/public/allCateparent")
    public List<CateParents> findAll(){
        return cateParentRepository.findAll();
    }

    @GetMapping("/public/cateparentById")
    public CateParents findById(@RequestParam("id") Long id){
        return cateParentRepository.findById(id).get();
    }

    @DeleteMapping("/admin/deletecateparent")
    public void deleteCategory(@RequestParam("id") Long id){
        cateParentRepository.deleteById(id);
    }
}
