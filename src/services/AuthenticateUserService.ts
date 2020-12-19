import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { jwt } from '../config/auth';
import { Collaborator } from '../models/Collaborator';
import { CollaboratorRepository } from '../repositories/CollaboratorsRepository';
import { connection } from '../database/dbConnection';

interface IRequest {
  login: string;
  password: string;
}

interface IResponse {
  collaborator: Collaborator;
  token: string;
}

class AuthenticateUserService {
  public async execute({ login, password }: IRequest): Promise<IResponse> {
    const collaboratorRepository = new CollaboratorRepository(connection());

    const collaborator = await collaboratorRepository.findByLogin(login);

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
