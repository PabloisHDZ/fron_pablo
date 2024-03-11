import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'postartist',
    loadComponent: () => import('./pages/artists/postartist/postartist.page').then( m => m.PostartistPage)
  },
  {
    path: 'updateartist/:id',
    loadComponent: () => import('./pages/artists/updateartist/updateartist.page').then( m => m.UpdateartistPage)
  },
  {
    path: 'updatealbum/:id',
    loadComponent: () => import('./pages/albums/updatealbum/updatealbum.page').then( m => m.UpdatealbumPage)
  },
  {
    path: 'postalbum',
    loadComponent: () => import('./pages/albums/postalbum/postalbum.page').then( m => m.PostalbumPage)
  },
  {
    path: 'postsong',
    loadComponent: () => import('./pages/songs/postsong/postsong.page').then( m => m.PostsongPage)
  },
  {
    path: 'updatesong/:id',
    loadComponent: () => import('./pages/songs/updatesong/updatesong.page').then( m => m.UpdatesongPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/users/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/users/signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'updateuser/:id',
    loadComponent: () => import('./pages/users/updateuser/updateuser.page').then( m => m.UpdateuserPage)
  },
  {
    path: 'perfiles',
    loadComponent: () => import('./pages/users/perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'homealbum',
    loadComponent: () => import('./pages/albums/homealbum/homealbum.page').then( m => m.HomealbumPage)
  },
  {
    path: 'homeartist',
    loadComponent: () => import('./pages/artists/homeartist/homeartist.page').then( m => m.HomeartistPage)
  },
  {
    path: 'homesong',
    loadComponent: () => import('./pages/songs/homesong/homesong.page').then( m => m.HomesongPage)
  },
  {
    path: 'albums/details/:id',
    loadComponent: () => import('./pages/albums/details/details.page').then( m => m.DetailsPage)
  },
  {
    path: 'songs/details/:id',
    loadComponent: () => import('./pages/songs/details/details.page').then( m => m.DetailsPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/users/profile/profile.page').then( m => m.ProfilePage)
  },
  
];
