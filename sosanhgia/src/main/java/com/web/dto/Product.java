package com.web.dto;

import com.web.entity.LinkWeb;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Product {

    private String linkImage;

    private String name;

    private String price;

    private String linkSp;

    private LinkWeb linkWeb;
}
