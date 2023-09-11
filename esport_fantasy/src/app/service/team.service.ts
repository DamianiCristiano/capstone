import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamServiceService {

  constructor(private http: HttpClient) { }

  getAllTeams() {
    return this.http.get('/api/team/all');
  }



  getTeamById(id: number) {
    return this.http.get(`/api/team/${id}`);
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

  createTeam(newTeam: any) {
    return this.http.post('/api/team/all', newTeam);
  }

  updateTeam(teamId: number, updatedTeam: any) {
    return this.http.put(`/api/team/all/${teamId}`, updatedTeam);
  }

  deleteTeam(teamId: number) {
    return this.http.delete(`/api/team/all/${teamId}`);
  }
}
