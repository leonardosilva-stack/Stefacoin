import { TipoUsuario } from './../utils/tipo-usuario.enum';
import Aluno from '../entities/aluno.entity';
import AlunoRepository from '../repositories/aluno.repository';
import { FilterQuery } from '../utils/database/database';
import Mensagem from '../utils/mensagem';
import { Validador } from '../utils/utils';

export default class AlunoController {

  async obterPorId(id: number): Promise<Aluno> {
    Validador.validarParametros([{ id }]);
    return await AlunoRepository.obterPorId(id);
  }

  async obter(filtro: FilterQuery<Aluno> = {}): Promise<Aluno> {
    return await AlunoRepository.obter(filtro);
  }
  
  // #pegabandeira
  async listar(filtro: FilterQuery<Aluno> = {}): Promise<Aluno[]> {
    // return await AlunoRepository.listar(filtro);
    return await AlunoRepository.listar({tipo: TipoUsuario.ALUNO});
  }

  // #pegabandeira
  async incluir(aluno: Aluno) {
    const { nome, formacao, idade, email, senha } = aluno;
    Validador.validarParametros([{ nome }, { formacao }, { idade }, { email }, { senha }]);
    const id = await AlunoRepository.incluir(aluno);
    return new Mensagem('Aluno incluido com sucesso!', {id});
  }

  async alterar(id: number, aluno: Aluno) {
    const { nome, email, senha } = aluno
    const verificaALuno: Aluno = await this.obterPorId(id) //VERIFICA
    if(verificaALuno.tipo == TipoUsuario.ALUNO){
      Validador.validarParametros([{ id }, { nome }, { email }, { senha }]);
      await AlunoRepository.alterar({ id }, aluno);
      return new Mensagem('Aluno alterado com sucesso!', {id});
    }else {
      return new Mensagem({message: "Aluno Invalido"})
    }
  }

  async excluir(id: number) {
    Validador.validarParametros([{ id }]);
    await AlunoRepository.excluir({ id });
    return new Mensagem('Aluno excluido com sucesso!', {id});
  }
}