import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Persona } from '../models/persona.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    correo: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles:string | undefined = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser()?.tipodeusuario;
    }
  }

  onSubmit(): void {
    const { correo, password } = this.form;
    this.authService.login(correo, password).subscribe(
      (data) => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser()?.tipodeusuario;
        window.location.reload();
      },
      (err) => {
        console.log(err);
        this.errorMessage =
          err.error.message || err.error.error.message || err.error.error;
        this.isLoginFailed = true;
      }
    );
  }

}
