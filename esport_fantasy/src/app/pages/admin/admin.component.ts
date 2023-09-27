import { MatchService } from './../../service/match.service';
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

  date: Date | undefined;

  playerForm: FormGroup;

  teamForm: FormGroup;

  editForm: FormGroup;

  editFormT: FormGroup;

  matchForm: FormGroup;

  editMatch: FormGroup;

  editMode = false;
  selectedPlayerId: number = 0;
  selectedMatchId: number = 0;
  selectedTeamId: number | null = null;
  players: any[] = [];
  teams: any[] = [];
  matches: any[] = [];





  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe((data: any) => {
      this.players = data;
    });
    this.TeamService.getAllTeams().subscribe((data: any) => {
      this.teams = data;
    });
    this.MatchService.getAllMatches().subscribe((data: any) => {
      this.matches = data;
    });
}



  constructor(private MatchService: MatchService, private TeamService: TeamService, private formBuilder: FormBuilder, private playerService: PlayerService) {
    this.playerForm = this.formBuilder.group({
      nickname: ['', Validators.required],
      nationality: ['', Validators.required],
      role: ['', Validators.required],
      teamId: ['', Validators.nullValidator],
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
      teamId: ['']
    });
    this.editFormT = this.formBuilder.group({
      id: [''],
      name: [''],
      league: [''],
      nationality: [''],
    });
    this.editMatch = this.formBuilder.group({
      id: [''],
      teamRId: [''],
      teamBId: [''],
      dayOfGames: ['']
    });
    this.matchForm = this.formBuilder.group({
      teamRId: ['' , Validators.required],
      teamBId: ['' , Validators.required],
      dayOfGames: ['', Validators.required]
    });
  }



  createPlayer() {
    if (this.playerForm.valid) {
      const newPlayerData = this.playerForm.value;
      console.log(this.playerForm.value);

      this.playerService.createPlayer(newPlayerData).subscribe((response) => {
        // Gestisci la risposta del server, ad esempio, mostra un messaggio di successo.
        console.log('Giocatore creato con successo:', response);
      });
    }
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }


  createTeam() {
    if (this.teamForm.valid) {
      const newTeamData = this.teamForm.value;
      this.TeamService.createTeam(newTeamData).subscribe((response) => {
        // Gestisci la risposta del server, ad esempio, mostra un messaggio di successo.
        console.log('Team creato con successo:', response);
      });
    }
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

    formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  createMatch() {
    console.log(this.matchForm.value);
    if (this.matchForm.valid) {
      const newMatchData = this.matchForm.value;
      const inputDateString = "Tue Sep 12 2023 11:30:26 GMT+0200 (Ora legale dell’Europa centrale)";
      const formattedDate = this.formatDate(inputDateString);
      console.log(formattedDate);

      newMatchData.date = formattedDate
      console.log(newMatchData.date);
      console.log(newMatchData);


      this.MatchService.createMatch(newMatchData).subscribe((response) => {
        console.log('Match creato con successo:', response);
      });
    }
    setTimeout(() => {
      window.location.reload();
    }, 350);
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
    setTimeout(() => {
      window.location.reload();
    }, 350);
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
    setTimeout(() => {
      window.location.reload();
    }, 350);
  }

  deleteMatch(matchId: number) {
    this.MatchService.deleteMatch(matchId).subscribe(
      (response) => {
        console.log('Match eliminato con successo', response);
        // Qui puoi aggiornare la lista dei giocatori dopo la cancellazione, se necessario.
      },
      (error) => {
        console.error(`Errore durante l'eliminazione del match`, error);
        // Gestire l'errore, ad esempio, mostrando un messaggio all'utente.
      }
    );
    setTimeout(() => {
      window.location.reload();
    }, 350);
  }


  startEdit(playerId: number) {
    this.editMode = true;
    this.selectedPlayerId = playerId;

    this.playerService.getPlayerById(playerId).subscribe((response) => {
      console.log(response);

      this.editForm.controls['idPlayer'].setValue(response.idPlayer);
      this.editForm.controls['nickname'].setValue(response.nickname);
      this.editForm.controls['nationality'].setValue(response.nationality);
      this.editForm.controls['role'].setValue(response.role);
      this.editForm.controls['teamId'].setValue(response.teamId);
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

  startEditMatch(matchId: number) {
    this.editMode = true;
    this.selectedMatchId = matchId;

    this.MatchService.getMatchById(matchId).subscribe((response) => {
      console.log(response);

      this.editMatch.controls['id'].setValue(response.id);
      this.editMatch.controls['teamBId'].setValue(response.teamBId);
      this.editMatch.controls['teamRId'].setValue(response.teamRId);
      this.editMatch.controls['dayOfGames'].setValue(response.dayOfGames);
    });
  }


  savePlayer() {
    if (this.selectedPlayerId !== null && typeof this.selectedPlayerId === 'number') {
      // Recupera i dati del giocatore dalla form
      const updatedPlayerData = this.editForm.value;
      console.log(updatedPlayerData);

      const teamId = updatedPlayerData.teamId;

      // Verifica che this.selectedPlayerId sia un numero non nullo
      if (typeof this.selectedPlayerId === 'number') {
        // Recupera l'oggetto team dal servizio tramite l'ID del team
        this.TeamService.getTeamById(teamId).toPromise().then((team) => {
          if (team) {
            updatedPlayerData.team = team; // Aggiungi l'oggetto del team ai dati del giocatore
            // Ora puoi chiamare il servizio per aggiornare il giocatore con i dati aggiornati
            this.playerService.updatePlayer(this.selectedPlayerId, updatedPlayerData, updatedPlayerData.team).subscribe(
              (response) => {
                console.log('Giocatore aggiornato con successo', response);
              },
              (error) => {
                console.error(`Errore durante l'aggiornamento del giocatore`, error);
              }
            );
          } else {
            console.error(`Team con ID ${teamId} non trovato.`);
          }
        });

        setTimeout(() => {
          window.location.reload();
        }, 350);
        this.editMode = false;
      }
    }
  }



  saveTeam() {
    if (this.selectedTeamId !== null && !isNaN(this.selectedTeamId as number)) {
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
      setTimeout(() => {
        window.location.reload();
      }, 350);
        this.editMode = false;
        this.selectedTeamId = null;
    }
  }

  saveMatch() {
    if (this.selectedMatchId !== null && !isNaN(this.selectedMatchId as number)) {
      // Recupera i dati del giocatore dalla form e chiama il servizio per aggiornare il giocatore
      const updatedMatchData = this.editMatch.value;
      console.log(this.editMatch.value);


      this.MatchService.updateMatch(this.selectedMatchId, updatedMatchData).subscribe(
        (response) => {
          console.log('Match aggiornato con successo', response);
          console.log(response);
        },
        (error) => {
          console.error(`Errore durante l'aggiornamento del Match`, error);
        }
      );
      // setTimeout(() => {
      //   window.location.reload();
      // }, 350);
        this.editMode = false;
    }
  }

}
