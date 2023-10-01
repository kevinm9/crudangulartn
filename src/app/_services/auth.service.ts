import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(correo: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + '/login/sesion',
      {
        correo,
        password,
      },
      httpOptions
    );
  }

  listar(): Observable<any> {
    return this.http.get(AUTH_API);
  }

  register(data: any): Observable<any> {
    return this.http.post(
      AUTH_API + '/personas',
      {
        data,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }
}
