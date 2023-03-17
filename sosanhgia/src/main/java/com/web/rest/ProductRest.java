package com.web.rest;

import com.web.dto.Product;
import com.web.entity.LinkWeb;
import com.web.repository.LinkApiRepository;
import com.web.repository.LinkWebRepository;
import com.web.service.ReadHtml;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ProductRest {

    @Autowired
    private ReadHtml readHtml;

    @Autowired
    private LinkWebRepository linkWebRepository;

    @GetMapping(value = "/public/searchjsoup", produces = "application/json; charset=UTF-8")
    public List<Product> findAll(@RequestParam("search") String param, @RequestParam(value = "id", required = false) Long idcate) throws IOException {
        System.out.println("++++++ "+param);
        List<Product> list = new ArrayList<>();
        if(idcate == null){
            for(LinkWeb l : linkWebRepository.findAll()){
                list.addAll(readHtml.readHtmlToObject(l,param));
            }
        }
        else{
            for(LinkWeb l : linkWebRepository.findByCategory(idcate)){
                list.addAll(readHtml.readHtmlToObject(l,param));
            }
        }
        return list;
    }


}
