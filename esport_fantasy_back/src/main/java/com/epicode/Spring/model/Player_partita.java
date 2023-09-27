package com.epicode.Spring.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Player_partita {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	private Player player;
	
	@ManyToOne
	private Match match;
	
	private Integer kill;
	
	private Integer death;
	
	private Integer assist;
	
	private Integer minion;
	
	private Integer gold;
	
	private Integer vision;
	
}
