package com.epicode.Spring.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epicode.Spring.model.Player;
import com.epicode.Spring.model.PlayerDto;
import com.epicode.Spring.model.Team;
import com.epicode.Spring.repository.PlayerRepository;
import com.epicode.Spring.repository.TeamRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PlayerService {

	@Autowired PlayerRepository playerRepo;
	@Autowired TeamRepository teamRepo;
	
	public List<Player> getAllPlayer() {
		return (List<Player>) playerRepo.findAll();
	}
	
	public Player getPlayerById(Long id) {
	    try {
	        Optional<Player> player = playerRepo.findById(id);
	        if (player.isEmpty()) {
	            throw new EntityNotFoundException("Player not found with ID: " + id);
	        }
	        return player.get();
	    } catch (EntityNotFoundException e) {
	        System.err.println("Eccezione EntityNotFoundException gestita: " + e.getMessage());
	        return null;
	    }
	}
	
	public List<Player> getPlayerByTeam(Long id) {
	    try {
	        List<Player> team = teamRepo.findPlayersByTeamId(id);
	        if (team.isEmpty()) {
	            throw new EntityNotFoundException("Team not found with ID: " + id);
	        }
	        return team;
	    } catch (EntityNotFoundException e) {
	        System.err.println("Eccezione EntityNotFoundException gestita: " + e.getMessage());
	        return null;
	    }
	}
	
	public List<Player> getPlayerByRole(String role) {
		try {
			List<Player> list = playerRepo.findPlayersByRole(role);
			if(list.isEmpty()) {
				 throw new EntityNotFoundException("Players not found with role: " + role);
			}
			return list;
		} catch (EntityNotFoundException e) {
	        System.err.println("Eccezione EntityNotFoundException gestita: " + e.getMessage());
	        return null;
		}
	}
	
	public List<Player> getPlayerByNationality(String nat) {
		try {
			List<Player> list = playerRepo.findPlayersByNationality(nat);
			if(list.isEmpty()) {
				 throw new EntityNotFoundException("Players not found with nationality: " + nat);
			}
			return list;
		}  catch (EntityNotFoundException e) {
	        System.err.println("Eccezione EntityNotFoundException gestita: " + e.getMessage());
	        return null;
		}
	}
	
	public Player createPlayer(PlayerDto player) {
		Player p = new Player();
		p.setNickname(player.getNickname());
		  Optional<Team> teamOptional = teamRepo.findById(player.getTeamId());
		    if (teamOptional.isPresent()) {
		        Team team = teamOptional.get();
		        p.setTeam(team);
		    } else {
		        // Gestione dell'errore se l'ID del team non esiste nel database
		        throw new EntityNotFoundException("Team with ID " + player.getTeamId() + " not found");
		    }
		p.setNationality(player.getNationality());
		p.setRole(player.getRole());
        return playerRepo.save(p);
    }
	
	public void deletePlayer(Long id){
		playerRepo.deleteById(id);
	}
	
	
	
	public Player editPlayer(Player player) {
	    try {
	        // Verifica se il giocatore esiste nel database
	        Optional<Player> existingPlayer = playerRepo.findById(player.getIdPlayer());
	        
	        if (existingPlayer.isPresent()) {
	            Player updatedPlayer = existingPlayer.get();
	            updatedPlayer.setNickname(player.getNickname());
	            updatedPlayer.setNationality(player.getNationality());
	            updatedPlayer.setRole(player.getRole());

	            // Verifica se il team nel giocatore non è nullo
	            if (player.getTeam() != null) {
	                // Ottieni l'ID del team dal giocatore e cerca il team nel repository
	                Long teamId = player.getTeam().getId();
	                Optional<Team> teamOptional = teamRepo.findById(teamId);

	                if (teamOptional.isPresent()) {
	                    updatedPlayer.setTeam(teamOptional.get());
	                } else {
	                    // Gestione dell'errore se l'ID del team non esiste nel database
	                    throw new EntityNotFoundException("Team with ID " + teamId + " not found");
	                }
	            } else {
	                updatedPlayer.setTeam(null); // Imposta il team del giocatore a null se il team nel giocatore è nullo
	            }

	            // Salva le modifiche nel database
	            return playerRepo.save(updatedPlayer);
	        } else {
	            // Il giocatore con l'ID specificato non esiste nel database
	            throw new EntityNotFoundException("Player with ID " + player.getIdPlayer() + " not found");
	        }
	    } catch (EntityNotFoundException e) {
	        System.err.println("Eccezione EntityNotFoundException gestita: " + e.getMessage());
	        // Restituisci un valore significativo anche in caso di eccezione
	        return null; // o un'altra rappresentazione significativa dell'errore
	    }
	}
}
