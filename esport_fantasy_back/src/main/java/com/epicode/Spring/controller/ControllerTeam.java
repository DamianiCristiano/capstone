package com.epicode.Spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epicode.Spring.Service.TeamService;
import com.epicode.Spring.model.Player;
import com.epicode.Spring.model.Team;
import com.epicode.Spring.repository.TeamRepository;

@RestController
@RequestMapping ("/api/auth/team")
public class ControllerTeam {

	@Autowired TeamRepository teamRepository;
	@Autowired TeamService teamService;

	    @GetMapping("/all")
	    public ResponseEntity<List<Team>> getAllTeams() {
	        List<Team> teams = teamService.getAllTeam();
	        return ResponseEntity.ok(teams);
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<Team> getTeamById(@PathVariable Long id) {
	        Team team = teamService.getTeamById(id);
	        if (team == null) {
	            return ResponseEntity.notFound().build();
	        }
	        return ResponseEntity.ok(team);
	    }

	    @GetMapping("/byNationality/{nat}")
	    public ResponseEntity<List<Team>> getTeamsByNationality(@PathVariable String nat) {
	        List<Team> teams = teamService.getTeamByNationality(nat);
	        if (teams == null) {
	            return ResponseEntity.notFound().build();
	        }
	        return ResponseEntity.ok(teams);
	    }

	    @GetMapping("/byLeague/{league}")
	    public ResponseEntity<List<Team>> getTeamsByLeague(@PathVariable String league) {
	        List<Team> teams = teamService.getTeamByLeague(league);
	        if (teams == null) {
	            return ResponseEntity.notFound().build();
	        }
	        return ResponseEntity.ok(teams);
	    }
	    
	    @GetMapping
	    public ResponseEntity<List<Team>> searchTeam(@RequestParam("searchTerm") String searchTerm) {
	        List<Team> teams = teamRepository.findByNameContaining(searchTerm);
	        return ResponseEntity.ok(teams);
	    }
	    
	    @PostMapping(value = "/create")
	    @CrossOrigin(origins = "http://localhost:4200")
	    public ResponseEntity<Team> createTeam(@RequestBody Team team) {
	        Team createdTeam = teamService.createTeam(team);
	        System.out.println(team);
	        return new ResponseEntity<>(createdTeam, HttpStatus.CREATED);
	    }
	    
	    @PutMapping("/edit/{id}")
	    @CrossOrigin(origins = "http://localhost:4200")
	    public ResponseEntity<Void> editTeam(@PathVariable("id") Long id, @RequestBody Team team) {
	        teamService.editTeam(team);
	        return ResponseEntity.noContent().build();
	    }
	    
	    @DeleteMapping("/delete/{id}")
	    @CrossOrigin(origins = "http://localhost:4200")
	    public ResponseEntity<Void> deleteTeam(@PathVariable("id") Long id) {
	        teamService.deleteTeam(id);
	        return ResponseEntity.noContent().build();
	    }
	    
	    
	    
}
	

