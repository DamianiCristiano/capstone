package com.epicode.Spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.epicode.Spring.model.Player;

public interface PlayerRepository extends CrudRepository<Player, Long>{

	@Query("Select p FROM Player p WHERE p.role = ?1")
	List<Player> findPlayersByRole(String role);
	
	@Query("Select p From Player p WHERE p.nationality = ?1")
	List<Player> findPlayersByNationality(String nationality);
	
	List<Player> findByNicknameContaining(String search);
	
	
}
