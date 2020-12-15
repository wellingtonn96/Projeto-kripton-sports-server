import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { jwt } from '../config/auth';
import { CollaboratorRepository } from '../repositories/CollaboratorsRepository';

interface IRequest {
  login: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ login, password }: IRequest) {
    const collaboratorRepository = new CollaboratorRepository();

    const [collaborator]: any = await collaboratorRepository.findByLogin(login);

    if (!collaborator) {
      throw new Error('Incorrect login/password combination');
    }

    const passwordMached = await compare(password, collaborator.senha);

    if (!passwordMached) {
      throw new Error('Incorrect login/password combination');
    }

    const token = sign({}, jwt.secret, {
      subject: login,
      expiresIn: jwt.expiresIn,
    });

    return {
      collaborator,
      token,
    };
  }
}

export { AuthenticateUserService };
