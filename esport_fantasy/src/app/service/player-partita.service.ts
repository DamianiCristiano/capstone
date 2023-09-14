import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerPartita } from '../interface/PlayerPartita';

@Injectable({
  providedIn: 'root'
})
export class PlayerPartitaService {


  private baseUrl = 'http://localhost:8080/api/auth/player_partita'; // Sostituisci con l'URL del tuo backend

  constructor(private http: HttpClient) { }

  getAllPlayerPartite(): Observable<PlayerPartita[]> {
    return this.http.get<PlayerPartita[]>(`${this.baseUrl}/all`);
  }

  getPlayerPartitaById(id: number): Observable<PlayerPartita> {
    return this.http.get<PlayerPartita>(`${this.baseUrl}/${id}`);
  }

  createPlayerPartita(playerPartita: PlayerPartita): Observable<PlayerPartita> {
    return this.http.post<PlayerPartita>(`${this.baseUrl}/create`, playerPartita);
  }

  updatePlayerPartita(id: number, playerPartita: PlayerPartita): Observable<PlayerPartita> {
    return this.http.put<PlayerPartita>(`${this.baseUrl}/${id}`, playerPartita);
  }

  deletePlayerPartita(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
