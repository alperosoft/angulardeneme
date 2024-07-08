import { Routes } from '@angular/router';
import { AnaSayfaComponent } from './anasayfa/anasayfa.component';
import { LoginComponent } from './login/login.component';

export const MaterialRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: AnaSayfaComponent, },
];
