package com.epicode.Spring.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.epicode.Spring.Service.PlayerPartitaService;
import com.epicode.Spring.model.Player_partita;

@RestController
@RequestMapping("api/auth/player_partita")
public class ControllerPlayerPartita {

	
	 @Autowired
	    private PlayerPartitaService playerPartitaService;

	    // Metodo per ottenere tutte le partite dei giocatori
	    @GetMapping("/all")
	    public ResponseEntity<List<Player_partita>> getAllPlayerPartite() {
	        List<Player_partita> playerPartite = playerPartitaService.getAllPlayerPartite();
	        return new ResponseEntity<>(playerPartite, HttpStatus.OK);
	    }

	    // Metodo per ottenere una partita di un giocatore per ID
	    @GetMapping("/{id}")
	    public ResponseEntity<Player_partita> getPlayerPartitaById(@PathVariable Long id) {
	        Optional<Player_partita> playerPartita = playerPartitaService.getPlayerPartitaById(id);
	        return playerPartita.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
	                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	    }

	    // Metodo per creare una nuova partita di un giocatore
	    @PostMapping ("/create")
	    public ResponseEntity<Player_partita> createPlayerPartita(@RequestBody Player_partita playerPartita) {
	        Player_partita createdPlayerPartita = playerPartitaService.createPlayerPartita(playerPartita);
	        return new ResponseEntity<>(createdPlayerPartita, HttpStatus.CREATED);
	    }

	    // Metodo per aggiornare una partita di un giocatore per ID
	    @PutMapping("/{id}")
	    public ResponseEntity<Player_partita> updatePlayerPartita(@PathVariable Long id, @RequestBody Player_partita playerPartita) {
	        Player_partita updatedPlayerPartita = playerPartitaService.updatePlayerPartita(id, playerPartita);
	        return new ResponseEntity<>(updatedPlayerPartita, HttpStatus.OK);
	    }

	    // Metodo per eliminare una partita di un giocatore per ID
	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deletePlayerPartita(@PathVariable Long id) {
	        playerPartitaService.deletePlayerPartita(id);
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    }
}
