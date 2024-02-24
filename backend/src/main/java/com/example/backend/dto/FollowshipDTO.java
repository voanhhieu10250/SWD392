package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FollowshipDTO {
    private Integer followShipId;
    private Integer followerUserId;
    private Integer followingUserId;
}
