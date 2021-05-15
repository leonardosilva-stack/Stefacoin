import { TipoUsuario } from "./../utils/tipo-usuario.enum";
import Professor from "../entities/professor.entity";
import ProfessorRepository from "../repositories/professor.repository";
import { FilterQuery } from "../utils/database/database";
import Mensagem from "../utils/mensagem";
import { Validador } from "../utils/utils";

export default class ProfessorController {
  async obterPorId(id: number): Promise<Professor> {
    Validador.validarParametros([{ id }]);

    return await ProfessorRepository.obterPorId(id);
  }

  async obter(filtro: FilterQuery<Professor> = {}): Promise<Professor> {
    return await ProfessorRepository.obter(filtro);
  }

  // #pegabandeira
  async listar(filtro: FilterQuery<Professor> = {}): Promise<Professor[]> {
    return await ProfessorRepository.listar(filtro);
  }

  // #pegabandeira
  async incluir(professor: Professor) {
    const { nome, email, senha, tipo } = professor;
    Validador.validarParametros([{ nome }, { email }, { senha }, {tipo}]);
    professor.tipo = TipoUsuario.PROFESSOR;
    
    const id = await ProfessorRepository.incluir(professor);
    return new Mensagem("Professor incluido com sucesso!", {id});
  }

  async alterar(id: number, professor: Professor) {
    const { nome, email, senha } = professor;

    const verificarProfessor: Professor = await this.obterPorId(id);
    if(verificarProfessor.tipo === TipoUsuario.PROFESSOR) {
      Validador.validarParametros([{ id }, { nome }, { email }, { senha }]);
      await ProfessorRepository.alterar({ id }, professor);
      return new Mensagem("Professor alterado com sucesso!", { id });
    }else {
      return new Mensagem({message: "Professor Invalido"});
    }
  }

  async excluir(id: number) {
    Validador.validarParametros([{ id }]);
    await ProfessorRepository.excluir({ id });
    return new Mensagem("Professor excluido com sucesso!", {id});
  }
}
