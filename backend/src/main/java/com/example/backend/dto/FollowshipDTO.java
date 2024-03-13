package com.example.backend.dto;

import com.example.backend.entity.User;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class FollowshipDTO {

    private Integer id;

    private UserDTO follower;

    private UserDTO following;
}
