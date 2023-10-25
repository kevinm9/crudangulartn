import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { Persona } from './models/persona.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private roles: string | null = '';
  isLoggedIn = false;
  isAlumno = false;
  username?: string;
  user?: Persona | null = null;
  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user?.tipodeusuario ? user.tipodeusuario : null;
      this.isAlumno = this.roles == 'estudiante' ? true : false;
      this.user = user;
      this.username = user?.nombres;
    }else{
      this.logout();
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.storageService.clean();
        //window.location.reload();
      },
      error: (err) => {
        console.log(err);
        this.storageService.clean();
        //window.location.reload();
      },
    });
  }
}
