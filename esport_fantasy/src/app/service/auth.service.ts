import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap} from 'rxjs';
import { JWTAuthResponse } from '../interface/JWTAuthResponse';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private backendUrl = 'http://localhost:8080/api/auth';

  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  register(user: any) {
    return this.http.post(`${this.backendUrl}/register`, user);
  }

  login(username: string, password: string) {
    return this.http.post<JWTAuthResponse>(`${this.backendUrl}/login`, { username, password }, { observe: 'response' })
      .pipe(
        tap(response => {
          if (response.body && response.body.accessToken) {
            const token = response.body.accessToken;
            localStorage.setItem('token', token); // Salva il token nel localStorage
            this.isAuthenticated.next(true);
          }
        }),
      );
  }



  // Funzione per effettuare il logout
  logout(): void {
    localStorage.removeItem('token'); // Rimuovi il token JWT dal localStorage
    this.isAuthenticated.next(false);
  }

  // Verifica se l'utente è autenticato
  isAuthenticatedUser(): Observable<boolean> {
    // Verifica se c'è un token nel localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Puoi aggiungere una logica aggiuntiva qui per verificare se il token è scaduto o valido
      // Se il token è valido, imposta isAuthenticated a true
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }

    console.log(token);
    return this.isAuthenticated.asObservable();
  }
}
