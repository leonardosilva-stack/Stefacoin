import { getTime } from 'date-fns';
import jwt from 'jsonwebtoken';
import Usuario from '../entities/usuario.entity';
import Login from '../models/login.model';
import UsuarioRepository from '../repositories/usuario.repository';
import config from '../utils/config/config';
import UnauthorizedException from '../utils/exceptions/unauthorized.exception';
import { Validador } from '../utils/utils';

export default class AlunoController {
  async login(crendeciais: Usuario): Promise<Login> {
    const { email, senha } = crendeciais;

    Validador.validarParametros([{ email }, { senha }]);
    const usuario = await UsuarioRepository.obter({ email });
    // #pegabandeira concluido
    if (!usuario) {
      throw new UnauthorizedException('Usuário ou senha inválida.');
    }
    await Validador.validarSenha(senha, usuario.senha);

    const accessToken = jwt.sign({ email: usuario.email, tipo: usuario.tipo }, config.auth.secret, {
      expiresIn: config.auth.expiresIn,
    });

    return {
      usuario: {
        email: usuario.email,
        nome: usuario.nome,
        tipo: usuario.tipo,
      },
      token: accessToken,
      expires: getTime(Date.now() / 1000) + 604800,
    };
  }
}
