package com.epicode.Spring.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlayerDto {

	private String nickname;
	private String nationality;
	private Long teamId;
	private String role;
	
}
