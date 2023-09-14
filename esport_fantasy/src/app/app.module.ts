import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HomeComponent } from './pages/home/home.component';
import { LobbiesComponent } from './pages/lobbies/lobbies.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { BodyComponent } from './components/body/body.component';
import { FaqComponent } from './pages/faq/faq.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './service/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './service/HTTPInterceptor';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { SliderLogoComponent } from './components/slider-logo/slider-logo.component';
import { AdminComponent } from './pages/admin/admin.component';
import { StatisticheComponent } from './pages/statistiche/statistiche.component';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SpeedDialModule } from 'primeng/speeddial';
import { MessageService } from 'primeng/api';
import { PlayerPartitaService } from './service/player-partita.service';
import { TeamService } from './service/team.service';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    SideNavComponent,
    LobbiesComponent,
    CalendarComponent,
    BodyComponent,
    FaqComponent,
    LoginRegisterComponent,
    SliderLogoComponent,
    AdminComponent,
    StatisticheComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TableModule,
    AccordionModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    SpeedDialModule
  ],
  providers: [
    AuthService,
    MessageService,
    PlayerPartitaService,
    TeamService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
