package com.example.backend.dto;

import com.example.backend.entity.User;
import lombok.Data;

@Data
public class FollowshipDTO {

    private Integer id;

    private User followerUser;

    private User followingUser;
}
