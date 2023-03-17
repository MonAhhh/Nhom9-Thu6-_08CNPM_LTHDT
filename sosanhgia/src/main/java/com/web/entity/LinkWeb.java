package com.web.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "link_web")
@Getter
@Setter
@ToString
public class LinkWeb {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String linkSearch;

    private String webName;

    private String webImage;

    private String classMain;

    private String classNameLink;

    private String classNamePrice;

    private String classNameProName;

    private String classNameImage;

    private String firstLinKWeb;

    private String firstLinkImage;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
