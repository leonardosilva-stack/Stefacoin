import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Usuario } from '../models/usuario';




@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API = `${environment.API}auth`
  nameToken: string = 'jwttoken';
  usuario: Usuario;

  constructor(private router: Router, private http: HttpClient, public jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(this.nameToken);
    return !this.jwtHelper.isTokenExpired(token || undefined);
  }

  getUsuario(): Usuario {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    return this.usuario;
  }

  setUsuario(usuario: Usuario) {
    localStorage.setItem('user', JSON.stringify(usuario));
  }

  auth(email: string, senha: string): Observable<Login> {
    return this.http.post<Login>(this.API, { email, senha });
  }

  forgout(): Observable<string> {
    localStorage.clear();
    return this.http.get<string>(this.API);
  }

  getToken(): string {
    return localStorage.getItem(this.nameToken) || '';
  }

  setToken(token: string) {
    localStorage.setItem(this.nameToken, token);
  }

  logout() {
    localStorage.removeItem(this.nameToken);
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
