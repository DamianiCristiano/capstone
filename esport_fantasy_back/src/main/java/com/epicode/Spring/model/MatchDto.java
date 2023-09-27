package com.epicode.Spring.model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class MatchDto {
    private Long teamRId;
    private Long teamBId;
    private Integer dayOfGames;
}
