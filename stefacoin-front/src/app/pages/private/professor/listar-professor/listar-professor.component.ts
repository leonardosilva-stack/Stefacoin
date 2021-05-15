import { Router } from '@angular/router';
import { ProfessorService } from './../../../../services/professor.service';
import { Professor } from './../../../../models/professor';
import { Usuario } from './../../../../models/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-professor',
  templateUrl: './listar-professor.component.html',
  styleUrls: ['./listar-professor.component.css']
})
export class ListarProfessorComponent implements OnInit {


  professor: Array<Professor> = []
  constructor(private professorService: ProfessorService, private router: Router) { }

  ngOnInit(): void {
    this.professorService.listar().subscribe(prof =>{
      this.professor = prof
    })
  }

  exluirItem = (id: any) =>{
    this.professorService.excluir(id).subscribe(() => this.ngOnInit())
    }
}
