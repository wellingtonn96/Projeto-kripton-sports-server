import bcrypt from 'bcrypt';
import { connection } from '@shared/infra/mysql/dbConnection';
import AppError from '@shared/errors/AppError';
import { Collaborator } from '../infra/mysql/entities/Collaborator';
import { CollaboratorRepository } from '../repositories/CollaboratorsRepository';

interface IRequest {
  login: string;
  senhaEncrypt: string;
  email: string;
  nome: string;
  sobrenome: string;
  telefone: string;
  idTipo: number;
}

class CreateCollaboratorService {
  public async execute({
    login,
    senhaEncrypt,
    email,
    nome,
    sobrenome,
    telefone,
    idTipo,
  }: IRequest): Promise<Collaborator> {
    const collaboratorRepository = new CollaboratorRepository(connection());

    const results = await collaboratorRepository.findByLogin(login);

    if (results) {
      throw new AppError('Collaborator already exists');
    }

    const encryptedPassword = await bcrypt.hash(senhaEncrypt, 8);

    const collaborator = await collaboratorRepository.create({
      login,
      senha: encryptedPassword,
      email,
      nome,
      sobrenome,
      telefone,
      idTipo,
    });

    return collaborator;
  }
}

export { CreateCollaboratorService };
