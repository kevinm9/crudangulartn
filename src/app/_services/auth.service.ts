import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona.model';

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
    return this.http.get(AUTH_API+ '/personas');
  }

  register(persona: Persona): Observable<any> {
    return this.http.post(AUTH_API + '/personas', persona, httpOptions);
  }

  update(persona: Persona, personaold: Persona): Observable<any> {
    return this.http.put(
      AUTH_API + '/personas/' + personaold.id,
      persona,
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }

  getUser(id: any): Observable<Persona> {
    return this.http.get<Persona>(`/productos/${id}`);
  }

  getPublicContent(): Observable<any> {
    return this.http.get('http://localhost:8080/', {
      responseType: 'text',
    });
  }



  delete(id: any): Observable<any> {
    return this.http.delete(`${AUTH_API}/${id}`);
  }
}
