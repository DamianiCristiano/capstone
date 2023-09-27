package com.epicode.Spring.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epicode.Spring.model.Player_partita;
import com.epicode.Spring.repository.PlayerPartitaRepository;
import com.epicode.Spring.security.exception.ResourceNotFoundException;

@Service
public class PlayerPartitaService {


    @Autowired
    private PlayerPartitaRepository playerPartitaRepo;

    public List<Player_partita> getAllPlayerPartite() {
        return  (List<Player_partita>) playerPartitaRepo.findAll();
    }

    public Optional<Player_partita> getPlayerPartitaById(Long id) {
        return playerPartitaRepo.findById(id);
    }

    public Player_partita createPlayerPartita(Player_partita playerPartita) {
        return playerPartitaRepo.save(playerPartita);
    }

    public Player_partita updatePlayerPartita(Long id, Player_partita playerPartita) {
        if (!playerPartitaRepo.existsById(id)) {
            throw new ResourceNotFoundException("Player_partita with id " + id + " not found", null, id);
        }
        playerPartita.setId(id);
        return playerPartitaRepo.save(playerPartita);
    }

    public void deletePlayerPartita(Long id) {
        if (!playerPartitaRepo.existsById(id)) {
            throw new ResourceNotFoundException("Player_partita with id " + id + " not found", null, id);
        }
        playerPartitaRepo.deleteById(id);
    }
	
}
