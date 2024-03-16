package com.example.backend.dto;

import com.example.backend.entity.Art;
import com.example.backend.entity.Staff;
import com.example.backend.entity.User;
import com.example.backend.entity.enums.ReportStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class ReportDTO {

    private Integer id;

    private UserDTO reporterUser;

    private UserDTO reportedUser;

    private ArtDTO art;

    private String description;

    private ReportStatus status;

    private StaffDTO resolverStaff;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Ho_Chi_Minh")
    private Date createdAt;

}
