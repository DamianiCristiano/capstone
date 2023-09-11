import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  ngOnInit(): void {

  }

  //TEAM


  //PLAYER

  playerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private playerService: PlayerService) {
    this.playerForm = this.formBuilder.group({
      name: ['', Validators.required],
      nationality: ['', Validators.required],
      role: ['', Validators.required],
      teamId: ['', Validators.required]
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
  }


}
