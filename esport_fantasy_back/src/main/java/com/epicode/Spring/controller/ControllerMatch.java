package com.epicode.Spring.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.epicode.Spring.Service.MatchService;
import com.epicode.Spring.model.Match;
import com.epicode.Spring.model.MatchDto;
import com.epicode.Spring.model.Player;
import com.epicode.Spring.model.PlayerDto;
import com.epicode.Spring.model.Team;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/auth/matches")
public class ControllerMatch {
    @Autowired
    private MatchService matchService;

    @GetMapping("/all")
    public ResponseEntity<List<Match>> getAllMatches() {
        List<Match> matches = matchService.getAllMatch();
        if (matches.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(matches);
    }

    @GetMapping("/get/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Match> getMatchById(@PathVariable Long id) {
        Match match = matchService.getMatchById(id);
        if (match == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(match);
    }


    @GetMapping("/day/{day}")
    public ResponseEntity<List<Match>> getMatchesByDayOfGames(@PathVariable Integer day) {
        List<Match> matches = matchService.getMatchBydayOfGames(day);
        if (matches.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(matches);
    }

    @GetMapping("/team")
    public ResponseEntity<List<Match>> getMatchesByTeam(@RequestParam(name = "teamId") Long teamId) {
        Team team = new Team();
        team.setId(teamId);
        List<Match> matches = matchService.getMatchByTeam(team);
        if (matches.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(matches);
    }
    
    
    @PostMapping("/create")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Match> createMatch(@RequestBody MatchDto match) {
        Match createdMatch = matchService.createMatch(match);
        System.out.println(match);
        return new ResponseEntity<>(createdMatch, HttpStatus.CREATED);
    }
    
    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Void> deleteMatch(@PathVariable("id") Long id) {
        matchService.deleteMatch(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/edit/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Void> editMatch(@PathVariable("id") Long id, @RequestBody MatchDto match) {
        matchService.editMatch(id, match);
        return ResponseEntity.noContent().build();
    }
}
