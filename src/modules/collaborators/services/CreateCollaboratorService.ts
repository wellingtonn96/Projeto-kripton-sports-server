import bcrypt from 'bcrypt';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Collaborator } from '../infra/mysql/entities/Collaborator';
import { ICollaaboratorsRepository } from '../repositories/ICollaboratorsRepository';

interface IRequest {
  login: string;
  senhaEncrypt: string;
  email: string;
  nome: string;
  sobrenome: string;
  telefone: string;
  idTipo: number;
}

@injectable()
class CreateCollaboratorService {
  constructor(
    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaaboratorsRepository,
  ) {}

  public async execute({
    login,
    senhaEncrypt,
    email,
    nome,
    sobrenome,
    telefone,
    idTipo,
  }: IRequest): Promise<Collaborator | undefined> {
    const results = await this.collaboratorRepository.findByLogin(login);

    if (results) {
      throw new AppError('Collaborator already exists');
    }

    const encryptedPassword = await bcrypt.hash(senhaEncrypt, 8);

    const collaborator = await this.collaboratorRepository.create({
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
