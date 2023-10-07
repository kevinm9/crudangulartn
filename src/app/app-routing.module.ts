import { GuardarPersonaComponent } from './guardar-persona/guardar-persona.component';
import { EditarPersonaComponent } from './editar-persona/editar-persona.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ListarprofesoresComponent } from './listarprofesores/listarprofesores.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: GuardarPersonaComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
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
