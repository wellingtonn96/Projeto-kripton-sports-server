import bcrypt from 'bcrypt';
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
  }: IRequest): Promise<any> {
    const collaboratorRepository = new CollaboratorRepository();

    const [results]: any = await collaboratorRepository.findByLogin(login);

    if (results) {
      throw new Error('Collaborator already exists');
    }

    const encryptedPassword = await bcrypt.hash(senhaEncrypt, 8);

    const { insertId }: any = await collaboratorRepository.create({
      login,
      senha: encryptedPassword,
      email,
      nome,
      sobrenome,
      telefone,
      idTipo,
    });

    const collaborator = await collaboratorRepository.findOneById(insertId);

    return collaborator;
  }
}

export { CreateCollaboratorService };
