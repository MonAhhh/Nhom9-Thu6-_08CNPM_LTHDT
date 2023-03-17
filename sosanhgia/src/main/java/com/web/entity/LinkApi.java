package com.web.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "link_api")
@Getter
@Setter
public class LinkApi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String method;

    private String body;

    private String webName;

    private String webAvatar;

    private String urlApi;

    private String firstApi;

    private String priceField;

    private String nameField;

    private String imageField;

    private String firstLinkField;

    private String linkField;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
