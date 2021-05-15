import { Aluno } from "./../models/aluno";
import { environment } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Mensagem } from "../models/mensagem";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({ providedIn: "root" })
export class AlunoService {
  private readonly API = `${environment.API}aluno`;
  nameToken: string = "jwttoken";
  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Aluno[]>(this.API);
  }

  obter() {}

  incluir(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.API, aluno);
  }

  alterar() {}

  excluir() {}
}
