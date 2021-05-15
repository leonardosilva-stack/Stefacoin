import { AlunoService } from './../../../services/aluno.service';
import { ToastrService } from 'ngx-toastr';
import { TipoUsuario } from "./../../../../../../stefacoin/src/utils/tipo-usuario.enum";
import { ProfessorService } from "src/app/services/professor.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Professor } from "src/app/models/professor";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent implements OnInit {
  cadastroForm: FormGroup = new FormGroup({
    nome: new FormControl("", Validators.required),
    idade: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    senha: new FormControl("", Validators.required),
    formacao: new FormControl("", Validators.required),
    tipo: new FormControl("", Validators.required),
  });
  
  tipo = 2;
  value = true;
  
  changeTipoTemplate(tipo) {
    this.tipo = tipo;
  }

  constructor(
    private router: Router,
    private professorService: ProfessorService,
    private alunoService: AlunoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
    
    

  cadastrado() {

    switch (this.tipo) {
      case TipoUsuario.ALUNO:
        this.value = true
        this.alunoService.incluir(this.cadastroForm.value).subscribe(
          ()=> {console.log("Sucesso");
        this.router.navigate(['/'])},
        (err)=>{
          this.toastr.error(err.error.message)
        })


        break;
      case TipoUsuario.PROFESSOR:
        this.value = false
        this.professorService.incluir(this.cadastroForm.value).subscribe(
          () => {console.log("Sucesso"); 
          this.router.navigate(['/'])},
          (err) =>{
            this.toastr.error(err.error.message)
          }
        )

        
        break;
      default:
        break;
    }
  }
}
