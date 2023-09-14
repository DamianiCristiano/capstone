import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../interface/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {



  constructor(private http: HttpClient) { }

  private backendUrl = 'http://localhost:8080/api/auth/team';


  getAllTeams() {
    return this.http.get(`${this.backendUrl}/all`);
  }

  getTeamById(id: number) {
    return this.http.get<Team>(`${this.backendUrl}/${id}`);
  }

  getTeamsByNationality(nat: string) {
    return this.http.get(`/api/team/byNationality/${nat}`);
  }

  getTeamsByLeague(league: string) {
    return this.http.get(`/api/team/byLeague/${league}`);
  }

  searchTeam(searchTerm: string) {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get('/api/team', { params });
  }

  createTeam(newTeamData: any) {
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
    return this.http.post(`${this.backendUrl}/create`, newTeamData, httpOptions);
  }

  updateTeam(teamId: number, updatedTeamData: any) {
    return this.http.put(`${this.backendUrl}/edit/${teamId}`, updatedTeamData);
  }

  deleteTeam(teamId: number) {
    return this.http.delete(`${this.backendUrl}/delete/${teamId}`);
  }
}
