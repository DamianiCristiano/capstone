import { player } from './../pages/admin/playerInterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class PlayerService {


  private backendUrl = 'http://localhost:8080/api/auth/player';

  constructor(private http: HttpClient) {}

  getAllPlayers() {
    return this.http.get(`${this.backendUrl}/all`);
  }

  getPlayerById(playerId: number) {
    return this.http.get<player>(`${this.backendUrl}/${playerId}`);
  }

  getPlayersByTeam(teamId: number) {
    return this.http.get(`${this.backendUrl}/byTeam/${teamId}`);
  }

  getPlayersByRole(role: string) {
    return this.http.get(`${this.backendUrl}/byRole/${role}`);
  }

  getPlayersByNationality(nationality: string) {
    return this.http.get(`${this.backendUrl}/byNationality/${nationality}`);
  }

  createPlayer(newPlayerData: any) {
    // Recupera il token dal localStorage o da qualsiasi altra fonte
    const token = localStorage.getItem('token');

    // Imposta gli header con il token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Assicurati di specificare il tipo di autenticazione (Bearer) se necessario
    });

    // Crea l'oggetto di opzioni per la richiesta HTTP con gli header
    const httpOptions = {
      headers: headers
    };

    // Esegui la richiesta HTTP con gli header
    return this.http.post(`${this.backendUrl}/create`, newPlayerData, httpOptions);
  }

  updatePlayer(playerId: number, updatedPlayerData: any) {
    return this.http.put(`${this.backendUrl}/edit/${playerId}`, updatedPlayerData);
  }


  deletePlayer(playerId: number) {
    return this.http.delete(`${this.backendUrl}/delete/${playerId}`);
  }
}
