package com.epicode.Spring.model;

import org.hibernate.annotations.ManyToAny;
import org.springframework.beans.factory.annotation.Autowired;

import com.epicode.Spring.repository.TeamRepository;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table (name = "Players")
public class Player {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idPlayer;
	
	@Column(unique = true)
	private String nickname;
	

	@ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;
	
	@ManyToOne
	@JoinColumn(name = "roster_id")
	private Roster roster;
	
	private String nationality;
	

	private String role;
	

}
