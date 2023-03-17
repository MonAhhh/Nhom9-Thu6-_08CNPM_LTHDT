package com.web.rest;

import com.web.entity.LinkWeb;
import com.web.repository.LinkWebRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class LinkWebRest {

    @Autowired
    private LinkWebRepository linkWebRepository;

    @PostMapping("/admin/addLinkWeb")
    public void save(@RequestBody LinkWeb linkWeb){
        linkWebRepository.save(linkWeb);
    }

    @GetMapping("/public/allLinkWeb")
    public List<LinkWeb> findAll(){
        return linkWebRepository.findAll();
    }

    @GetMapping("/public/linkWebById")
    public LinkWeb findById(@RequestParam("id") Long id){
        return linkWebRepository.findById(id).get();
    }

    @DeleteMapping("/admin/deleteLinkWeb")
    public void deleteCategory(@RequestParam("id") Long id){
        linkWebRepository.deleteById(id);
    }
}
