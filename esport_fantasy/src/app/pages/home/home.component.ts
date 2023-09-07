import { SideNavComponent } from './../../components/side-nav/side-nav.component';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  isRegistering = false; // Inizia con il form di registrazione

  isAuthenticated: boolean = false;

  registerForm = {name:'', username:'', email:'', password:'' };

  loginForm = { username: '', password: '' };

  constructor(private authService: AuthService) {
    this.authService.isAuthenticatedUser().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }


  toggleAuthMode(event: Event) {
    event.preventDefault();
    this.isRegistering = !this.isRegistering;
  }

  register() {
    this.authService.register(this.registerForm).subscribe(
      (response) => {

        console.log('Utente registrato:', response);
      },
      (error) => {
        // Gestisci gli errori durante la registrazione
        console.error('Errore durante la registrazione:', error);
      }
    );
  }

  login() {
    this.authService.login(this.loginForm.username, this.loginForm.password).subscribe(
      (response) => {
        // Gestisci la risposta dopo l'accesso
        console.log('Accesso effettuato:', response);
      },
      (error) => {
        // Gestisci gli errori durante l'accesso
        console.error('Errore durante l\'accesso:', error);
      }
    );
  }


}
