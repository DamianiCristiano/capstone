import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { style, transition, trigger, animate } from '@angular/animations';
import { AuthService } from 'src/app/service/auth.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('fadeInOut', [transition(':enter', [
      style({opacity: 0}),
      animate('350ms' ,
      style({opacity: 1})
    )
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate('200ms' ,
      style({opacity: 0})
      )
    ])
  ])
 ]
})


export class SideNavComponent implements OnInit {


  isAuthenticated: boolean = false;

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed= false;
  screenWidth = 0;
  navData = navbarData;


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed,
        screenWidth: this.screenWidth});
    }
  }

  constructor(private authService: AuthService) {
    this.authService.isAuthenticatedUser().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  isAdmin = localStorage.getItem('isAdmin');


  logout() {
    // Esegui la logica di logout, come rimuovere il token dal localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    // Imposta isAuthenticated su false
    this.isAuthenticated = false;
    // Redirigi l'utente alla pagina di accesso o a un'altra pagina desiderata
    // Puoi usare il router di Angular per farlo
    window.location.reload();
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.collapsed = false;
  }

  toggleCollapse():  void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed,
      screenWidth: this.screenWidth});
    }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed,
      screenWidth: this.screenWidth});
  }
}
