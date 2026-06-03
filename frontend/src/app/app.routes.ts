import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
// import { AiPage } from './pages/ai/ai-page/ai-page';
import { authGuard } from './core/guards/auth.guard';
import { CanActivate } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home')
        .then(m => m.Home),
    canActivate: [authGuard]
  }, 
  {
    path: 'ai',
    loadComponent: () => import('./pages/ai/ai-page/ai-page').then(m => m.AiPage),
    canActivate: [authGuard]
  }
];
