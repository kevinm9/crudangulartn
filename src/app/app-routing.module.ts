import { GuardarPersonaComponent } from './guardar-persona/guardar-persona.component';
import { EditarPersonaComponent } from './editar-persona/editar-persona.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ListarprofesoresComponent } from './listarprofesores/listarprofesores.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: GuardarPersonaComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'editarpersona/:id', component: EditarPersonaComponent },
  { path: 'profesores', component: ListarprofesoresComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'error',
    component: HomeComponent, // Página de error personalizada
  },
  {
    path: '**',
    redirectTo: '/error', // Redirecciona cualquier ruta no coincidente a la página de error
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
