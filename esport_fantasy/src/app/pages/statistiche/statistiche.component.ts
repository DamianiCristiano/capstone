import { PlayerPartitaService } from '../../service/player-partita.service';
import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-statistiche',
  templateUrl: './statistiche.component.html',
  styleUrls: ['./statistiche.component.scss']
})
export class StatisticheComponent implements OnInit {

  constructor(private playerService: PlayerService, private playerPartitaService: PlayerPartitaService) {}

  players: any[] = [];
  playerPartite: any[] = [];

  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe((data: any) => {
      this.players = data; // Assegna i dati ricevuti dalla chiamata HTTP alla variabile players
    });
    this.playerPartitaService.getAllPlayerPartite().subscribe((data: any) => {
      this.playerPartite = data; // Assegna i dati ricevuti dalla chiamata HTTP alla variabile playerPartite
    });
  }

}
