import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem';
import { Professor } from '../models/professor';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({providedIn: 'root'})


export class ProfessorService {
  private readonly API = `${environment.API}professor`
  nameToken: string = 'jwttoken';
  constructor(private http: HttpClient) {}

  // #pegabandeira
  listar() { //: Observable<Professor[]>
    return this.http.get<Professor[]>(this.API);
  }

  obter() {}

  incluir(professor: Professor): Observable<Professor> { // MENSAGEM
    return this.http.post<Professor>(this.API, professor);
  }

  alterar(professor: Professor) {
    return this.http.put(`${this.API}${professor.id}`,professor)
  }

  excluir(id: any) {
    return this.http.delete(`${this.API}/${id}`);
  }

}
