import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ProfilesComponent } from './components/profiles/profiles.component';

export const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'profiles', component: ProfilesComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
