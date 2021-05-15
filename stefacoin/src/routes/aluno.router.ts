import { TipoUsuario } from './../utils/tipo-usuario.enum';
import express, { NextFunction, Request, Response } from 'express';
import AlunoController from '../controllers/aluno.controller';
import Aluno from '../entities/aluno.entity';
import Mensagem from '../utils/mensagem';

const router = express.Router();

router.post('/aluno', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mensagem: Mensagem = await new AlunoController().incluir(req.body);
    res.json(mensagem);
  } catch (e) {
    next(e);
  }
});

router.put('/aluno/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
      const mensagem: Mensagem = await new AlunoController().alterar(Number(id), req.body);
      res.json(mensagem);
  } catch (e) {
    next(e);
  }
});

router.delete('/aluno/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const aluno: Aluno = await new AlunoController().obterPorId(Number(id));
    
    if(aluno.tipo === TipoUsuario.ALUNO){
      const mensagem: Mensagem = await new AlunoController().excluir(Number(id));
      res.json(mensagem);
    } else {
      throw  res.status(404).json({ message: "Aluno não encontrado" });
    }
  } catch (e) {
    next(e);
  }
});

router.get('/aluno/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const aluno: Aluno = await new AlunoController().obterPorId(Number(id));
    const {nome , idade, formacao} = aluno;
    
    if(aluno.tipo === TipoUsuario.ALUNO){
      res.json({id: id, nome: nome, idade: idade, formacao: formacao });
    } else {
      throw  res.status(404).json({ message: "Aluno não encontrado" });
    }
  } catch (e) {
    next(e);
  }
});

router.get('/aluno', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const alunos: Aluno[] = await new AlunoController().listar({tipo: TipoUsuario.ALUNO});
    const alunos: Aluno[] = await new AlunoController().listar();
    const ALUNOS = alunos.flatMap((aluno, index)=> {return [{id: aluno.id, nome:aluno.nome, idade:aluno.idade, formacao: aluno.formacao, curso: aluno.cursos}]});
    res.json(ALUNOS);
  } catch (e) {
    next(e);
  }
});

export default router;