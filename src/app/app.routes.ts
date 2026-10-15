import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Landing} from './landing/landing';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [

  { path: '', component: Landing },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard]}

  
];
