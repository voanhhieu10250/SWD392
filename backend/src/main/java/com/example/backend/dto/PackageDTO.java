package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.OneToMany;
import lombok.Data;


import java.util.Date;
import java.util.List;

@Data
public class PackageDTO {

    private Integer id;

    private String packageName;

    private String desciption;

    private String maxUploads;

    private double price;

    private Integer duration;

    @OneToMany(mappedBy = "aPackage")
    private List<UserDTO> users;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Ho_Chi_Minh")
    private Date createdAt;
}
