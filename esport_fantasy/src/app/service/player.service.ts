import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) {}

  getAllPlayers() {
    return this.http.get('/api/players/all');
  }

  getPlayerById(playerId: number) {
    return this.http.get(`/api/players/${playerId}`);
  }

  getPlayersByTeam(teamId: number) {
    return this.http.get(`/api/players/byTeam/${teamId}`);
  }

  getPlayersByRole(role: string) {
    return this.http.get(`/api/players/byRole/${role}`);
  }

  getPlayersByNationality(nationality: string) {
    return this.http.get(`/api/players/byNationality/${nationality}`);
  }

  createPlayer(newPlayerData: any) {
    return this.http.post('/api/players/create', newPlayerData);
  }

  updatePlayer(playerId: number, updatedPlayerData: any) {
    return this.http.put(`/api/players/${playerId}`, updatedPlayerData);
  }

  deletePlayer(playerId: number) {
    return this.http.delete(`/api/players/${playerId}`);
  }
}
