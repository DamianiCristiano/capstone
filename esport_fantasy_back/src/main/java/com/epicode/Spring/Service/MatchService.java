package com.epicode.Spring.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epicode.Spring.model.Match;
import com.epicode.Spring.model.MatchDto;
import com.epicode.Spring.model.Team;
import com.epicode.Spring.repository.MatchRepository;
import com.epicode.Spring.repository.TeamRepository;
import com.epicode.Spring.security.exception.CustomEntityNotFoundException;

import jakarta.persistence.EntityNotFoundException;

@Service
public class MatchService {

	@Autowired MatchRepository matchRepo;
	@Autowired TeamRepository teamRepo;
	
	public Match createMatch(MatchDto match) {
		System.out.println(match);
	    Match m = new Match();


	    m.setDayOfGames(match.getDayOfGames());

	    // Recupera teamR dal repository utilizzando l'ID
	    Optional<Team> teamROptional = teamRepo.findById(match.getTeamRId());
	    if (teamROptional.isPresent()) {
	        Team teamR = teamROptional.get();
	        m.setTeamRId(teamR);
	    } else {
	        // Gestione dell'errore se l'ID del teamR non esiste nel database
	        throw new EntityNotFoundException("Team with ID " + match.getTeamRId() + " not found");
	    }

	    // Recupera teamB dal repository utilizzando l'ID
	    Optional<Team> teamBOptional = teamRepo.findById(match.getTeamBId());
	    if (teamBOptional.isPresent()) {
	        Team teamB = teamBOptional.get();
	        m.setTeamBId(teamB);
	    } else {
	        // Gestione dell'errore se l'ID del teamB non esiste nel database
	        throw new EntityNotFoundException("Team with ID " + match.getTeamBId() + " not found");
	    }
	    return matchRepo.save(m);
	}
	
	public List<Match> getAllMatch() {
		return (List<Match>) matchRepo.findAll();
	}
	
	public Match getMatchById(Long id) {
		try {
			Optional<Match> match = matchRepo.findById(id);
			System.out.println(match);
			if(match.isEmpty()) {
				throw new EntityNotFoundException("Match not found with ID: " + id);
			} 
			return match.get();
		}
			catch (EntityNotFoundException e) {
		        System.err.println("Eccezione EntityNotFoundException gestita: " + e.getMessage());
		        return null;
		
			}
		}
	

	
	public List<Match> getMatchBydayOfGames (Integer day) {
		try {
			List<Match> match = matchRepo.findMatchBydayOfGames(day);
			if(match.isEmpty()) {
				throw new EntityNotFoundException("Match not found with day: " + day);
			} return match;
		} catch (EntityNotFoundException e) {
	        System.err.println("Eccezione EntityNotFoundException gestita: " + e.getMessage());
	        return null; 
	        }
		}
	
	public List<Match> getMatchByTeam (Team team) {
		try {
			List<Match> match = matchRepo.findMatchByTeam(team.getId());
			if(match.isEmpty()) {
				throw new EntityNotFoundException("Match not found with team: " + team);
			} return match;
		} catch (EntityNotFoundException e) {
	        System.err.println("Eccezione EntityNotFoundException gestita: " + e.getMessage());
	        return null; 
	        }
		}
	
	public void deleteMatch (Long id) {
		matchRepo.deleteById(id);
	}
	
	public Match editMatch(Long matchId, MatchDto matchDto) {
	    try {
	        // Check if the match exists in the database
	        Optional<Match> existingMatch = matchRepo.findById(matchId);
	        if (existingMatch.isPresent()) {
	            Match updatedMatch = existingMatch.get();
	            
	            // Update the fields based on the MatchDto
	            updatedMatch.setDayOfGames(matchDto.getDayOfGames());

	            // Check if teamRId and teamBId are not null in the MatchDto
	            if (matchDto.getTeamRId() != null && matchDto.getTeamBId() != null) {
	                // Find the teams in the repository by their IDs
	                Optional<Team> teamROptional = teamRepo.findById(matchDto.getTeamRId());
	                Optional<Team> teamBOptional = teamRepo.findById(matchDto.getTeamBId());

	                if (teamROptional.isPresent() && teamBOptional.isPresent()) {
	                    updatedMatch.setTeamRId(teamROptional.get());
	                    updatedMatch.setTeamBId(teamBOptional.get());
	                } else {
	                    // Handle the error if one or both team IDs are not found in the database
	                    throw new CustomEntityNotFoundException("One or both teams not found");
	                }
	            } else {
	                // Set teamRId and teamBId to null if they are null in the MatchDto
	                updatedMatch.setTeamRId(null);
	                updatedMatch.setTeamBId(null);
	            }

	            // Save the changes to the database
	            return matchRepo.save(updatedMatch);
	        } else {
	            // The match with the specified ID does not exist in the database
	            throw new CustomEntityNotFoundException("Match with ID " + matchId + " not found");
	        }
	    } catch (CustomEntityNotFoundException e) {
	        // Log or handle the exception appropriately
	        System.err.println("CustomEntityNotFoundException handled: " + e.getMessage());
	        return null; // or another meaningful representation of the error
	    }
	}
}
