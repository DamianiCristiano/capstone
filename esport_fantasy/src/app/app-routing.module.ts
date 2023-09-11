import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LobbiesComponent } from './pages/lobbies/lobbies.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { FaqComponent } from './pages/faq/faq.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    component: HomeComponent,
    path: 'home',
    },
  {
    component: CalendarComponent,
    path: 'calendar',
    },
  {
    component: LobbiesComponent,
    path: 'lobbies',
    },
  {
    component: LoginRegisterComponent,
    path: 'login',
    },
  {
    component: FaqComponent,
    path: 'faq',
    },
  {
    component: AdminComponent,
    path: 'admin',
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
