package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;


import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Package extends TimeAuditable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String packageName;

    private String desciption;

    private String maxUploads;

    private double price;

    private Integer duration;

    @OneToMany(mappedBy = "aPackage")
    private List<User> users;

}
