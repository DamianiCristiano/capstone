import { PlayerPartitaService } from '../../service/player-partita.service';
import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/service/player.service';
import { player } from '../admin/playerInterface';
import { PlayerPartita } from 'src/app/interface/PlayerPartita';

@Component({
  selector: 'app-statistiche',
  templateUrl: './statistiche.component.html',
  styleUrls: ['./statistiche.component.scss']
})
export class StatisticheComponent implements OnInit {

  constructor(private playerService: PlayerService, private playerPartitaService: PlayerPartitaService) {}

  // players: any[] = [];
  playerPartite: PlayerPartita[] = [];

  players!: player[];


  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe((data: any) => {
      this.players = data; // Assegna i dati ricevuti dalla chiamata HTTP alla variabile players
    });
    this.playerPartitaService.getAllPlayerPartite().subscribe((data: any) => {
      this.playerPartite = data; // Assegna i dati ricevuti dalla chiamata HTTP alla variabile playerPartite
      console.log(this.playerPartite);

    });
  }



}
