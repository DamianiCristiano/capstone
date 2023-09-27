import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../interface/Match';

@Injectable()
export class MatchService {


  private baseUrl = 'http://localhost:8080/api/auth/matches';

  constructor(private http: HttpClient) { }

  createMatch(match: Match): Observable<Match> {
    return this.http.post<Match>(`${this.baseUrl}/create`, match);
  }

  getAllMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.baseUrl}/all`);
  }

  getMatchById(id: number): Observable<Match> {
    return this.http.get<Match>(`${this.baseUrl}/${id}`);
  }

  getMatchesByDate(date: string): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.baseUrl}/date/${date}`);
  }

  getMatchesByDay(day: number): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.baseUrl}/day/${day}`);
  }

  getMatchesByTeam(teamId: number): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.baseUrl}/team/${teamId}`);
  }

  deleteMatch(matchId: number) {
    return this.http.delete(`${this.baseUrl}/delete/${matchId}`);
  }

  updateMatch(matchId: number, matchData: any) {
    const updateData = { ...matchData, matchId }; // Aggiungi l'ID del team ai dati del giocatore
    return this.http.put(`${this.baseUrl}/edit/${matchId}`, updateData);
  }
}
