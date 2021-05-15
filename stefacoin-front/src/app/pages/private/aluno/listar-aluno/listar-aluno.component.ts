import { Aluno } from './../../../../models/aluno';
import { Router } from '@angular/router';
import { AlunoService } from './../../../../services/aluno.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-aluno',
  templateUrl: './listar-aluno.component.html',
  styleUrls: ['./listar-aluno.component.css']
})
export class ListarAlunoComponent implements OnInit {


  aluno: Array<Aluno> = [];
  constructor(private alunoService: AlunoService, private router: Router) { }

  ngOnInit(): void {
    this.alunoService.listar().subscribe(aluno =>{
      this.aluno = aluno
    })
  }

}
