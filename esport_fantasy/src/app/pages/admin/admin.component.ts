import { TeamService } from './../../service/team.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from 'src/app/service/player.service';
import { MessageService, SelectItem } from 'primeng/api';





@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [MessageService]
})



export class AdminComponent implements OnInit {

  playerForm: FormGroup;

  teamForm: FormGroup;

  editForm: FormGroup;

  editFormT: FormGroup;

  editMode = false;
  selectedPlayerId: number | null = null;
  selectedTeamId: number | null = null;
  players: any[] = [];
  teams: any[] = [];





  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe((data: any) => {
      this.players = data; // Assegna i dati ricevuti dalla chiamata HTTP alla variabile players
    });
    this.TeamService.getAllTeams().subscribe((data: any) => {
      this.teams = data;
    });
}



  constructor(private TeamService: TeamService, private formBuilder: FormBuilder, private playerService: PlayerService) {
    this.playerForm = this.formBuilder.group({
      nickname: ['', Validators.required],
      nationality: ['', Validators.required],
      role: ['', Validators.required],
      team_id: ['', Validators.nullValidator],
    });
    this.teamForm = this.formBuilder.group({
      name: ['', Validators.required],
      league: ['', Validators.required],
      nationality: ['', Validators.required],
    });
    this.editForm = this.formBuilder.group({
      idPlayer: [''],
      nickname: [''],
      nationality: [''],
      role: [''],
      team_id: ['']
    });
    this.editFormT = this.formBuilder.group({
      id: [''],
      name: [''],
      league: [''],
      nationality: [''],
    });
  }



  createPlayer() {
    if (this.playerForm.valid) {
      const newPlayerData = this.playerForm.value;
      this.playerService.createPlayer(newPlayerData).subscribe((response) => {
        // Gestisci la risposta del server, ad esempio, mostra un messaggio di successo.
        console.log('Giocatore creato con successo:', response);
      });
    }
    // window.location.reload();
  }


  createTeam() {
    if (this.teamForm.valid) {
      const newTeamData = this.teamForm.value;
      this.TeamService.createTeam(newTeamData).subscribe((response) => {
        // Gestisci la risposta del server, ad esempio, mostra un messaggio di successo.
        console.log('Team creato con successo:', response);
      });
    }
    window.location.reload();
  }


  deletePlayer(playerId: number) {
    this.playerService.deletePlayer(playerId).subscribe(
      (response) => {
        console.log('Giocatore eliminato con successo', response);
        // Qui puoi aggiornare la lista dei giocatori dopo la cancellazione, se necessario.
      },
      (error) => {
        console.error(`Errore durante l'eliminazione del giocatore`, error);
        // Gestire l'errore, ad esempio, mostrando un messaggio all'utente.
      }
    );
    window.location.reload();
  }

  deleteTeam(teamId: number) {
    this.TeamService.deleteTeam(teamId).subscribe(
      (response) => {
        console.log('Team eliminato con successo', response);
        // Qui puoi aggiornare la lista dei giocatori dopo la cancellazione, se necessario.
      },
      (error) => {
        console.error(`Errore durante l'eliminazione del giocatore`, error);
        // Gestire l'errore, ad esempio, mostrando un messaggio all'utente.
      }
    );
    window.location.reload();
  }


  startEdit(playerId: number) {
    this.editMode = true;
    this.selectedPlayerId = playerId;

    this.playerService.getPlayerById(playerId).subscribe((response) => {
      this.editForm.controls['idPlayer'].setValue(response.idPlayer);
      this.editForm.controls['nickname'].setValue(response.nickname);
      this.editForm.controls['nationality'].setValue(response.nationality);
      this.editForm.controls['role'].setValue(response.role);
      this.editForm.controls['team_id'].setValue(response.team_id);
    });
  }

  startEditT(teamId: number) {
    this.editMode = true;
    this.selectedTeamId = teamId;

    this.TeamService.getTeamById(teamId).subscribe((response) => {
      console.log(response);

      this.editFormT.controls['id'].setValue(response.id);
      this.editFormT.controls['name'].setValue(response.name);
      this.editFormT.controls['league'].setValue(response.league);
      this.editFormT.controls['nationality'].setValue(response.nationality);
    });
  }


  savePlayer() {
    if (this.selectedPlayerId !== null && !isNaN(this.selectedPlayerId)) {
      // Recupera i dati del giocatore dalla form e chiama il servizio per aggiornare il giocatore
      const updatedPlayerData = this.editForm.value;
      console.log(updatedPlayerData);

      this.playerService.updatePlayer(this.selectedPlayerId, updatedPlayerData).subscribe(
        (response) => {
          console.log('Giocatore aggiornato con successo', response);
          console.log(response);
        },
        (error) => {
          console.error(`Errore durante l'aggiornamento del giocatore`, error);
        }
      );
        // window.location.reload();
        this.editMode = false;
        this.selectedPlayerId = null;
    }
  }


  saveTeam() {
    if (this.selectedTeamId !== null && !isNaN(this.selectedTeamId)) {
      // Recupera i dati del giocatore dalla form e chiama il servizio per aggiornare il giocatore
      const updatedTeamData = this.editFormT.value;
      console.log(this.editFormT.value);

      this.TeamService.updateTeam(this.selectedTeamId, updatedTeamData).subscribe(
        (response) => {
          console.log('Team aggiornato con successo', response);
          console.log(response);
        },
        (error) => {
          console.error(`Errore durante l'aggiornamento del Team`, error);
        }
      );
        window.location.reload();
        this.editMode = false;
        this.selectedTeamId = null;
    }
  }

}
