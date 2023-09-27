package com.epicode.Spring.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.epicode.Spring.model.Team;
import java.util.List;
import com.epicode.Spring.model.Player;


public interface TeamRepository extends CrudRepository<Team, Long>{

    @Query("SELECT p FROM Player p WHERE p.team.id = ?1")
    List<Player> findPlayersByTeamId(Long teamId);
    
    @Query("Select t FROM Team t WHERE t.nationality = ?1")
	List<Team> findTeamByNationality(String nationality);
    
    @Query("Select t FROM Team t WHERE t.league = ?1")
    List<Team> findTeamByLeague(String league);
    
    List<Team> findByNameContaining(String search);
    
	
}
