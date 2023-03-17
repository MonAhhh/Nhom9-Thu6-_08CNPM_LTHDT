package com.web.service;

import com.web.dto.Product;
import com.web.entity.LinkWeb;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
//@EnableAsync
public class ReadHtml {

//    @Async
    public List<Product> readHtmlToObject(LinkWeb linkWeb, String param) throws IOException {
        List<Product> list = new ArrayList<>();
        String url = linkWeb.getLinkSearch()+param;
        System.out.println("url :"+url);
        String classMain = linkWeb.getClassMain();
        String classNamePrice = linkWeb.getClassNamePrice();
        String classNameProName = linkWeb.getClassNameProName();
        String classNameImage = linkWeb.getClassNameImage();

        Long s = System.currentTimeMillis();

        Document doc = Jsoup.connect(linkWeb.getLinkSearch()+param).get();
        Integer num = doc.getElementsByClass(classMain).size();
        System.out.println("============== "+num+"===================");
        System.out.println(num);
        for(int i=0; i<num; i++){
            Element e = doc.getElementsByClass(classMain).get(i);
            String image = e.getElementsByClass(classNameImage).get(0).getElementsByTag("img").get(0).attr("src");
            String linkProduct = e.getElementsByTag("a").get(0).attr("href");
            String tenproduct = e.getElementsByClass(classNameProName).get(0).text();
            String giaproduct = e.getElementsByClass(classNamePrice).get(0).text();

            Product product = new Product();
            product.setPrice(giaproduct);
            product.setLinkImage(linkWeb.getFirstLinkImage()+ image);
            product.setLinkSp(linkWeb.getFirstLinKWeb() +linkProduct);
            product.setName(tenproduct);
            product.setLinkWeb(linkWeb);
            list.add(product);
        }
        System.out.println(s-System.currentTimeMillis());
        return list;

    }

    public static void main(String[] args) throws IOException {
        ReadHtml readHtml = new ReadHtml();
        LinkWeb linkWeb = new LinkWeb();
        linkWeb.setLinkSearch("https://laptop88.vn/tim?q=");
        linkWeb.setClassMain("product-item");
        linkWeb.setClassNameImage("product-img");
        linkWeb.setClassNameProName("product-title");
        linkWeb.setClassNamePrice("price-bottom");
        String param = "máy tính";
        readHtml.readHtmlToObject(linkWeb, param).forEach(p->{
            System.out.println(p);
        });
    }
}
