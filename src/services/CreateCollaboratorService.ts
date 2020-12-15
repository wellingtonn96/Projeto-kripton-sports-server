import { CollaboratorRepository } from '../repositories/CollaboratorsRepository';

interface IRequest {
  login: string;
  senha: string;
  email: string;
  nome: string;
  sobrenome: string;
  telefone: string;
  idTipo: number;
}

class CreateCollaboratorService {
  public async execute({
    login,
    senha,
    email,
    nome,
    sobrenome,
    telefone,
    idTipo,
  }: IRequest): Promise<IRequest> {
    const collaboratorRepository = new CollaboratorRepository();

    const [results]: any = await collaboratorRepository.findByLogin(login);

    if (results) {
      throw new Error('Collaborator already exists');
    }

    await collaboratorRepository.create({
      login,
      senha,
      email,
      nome,
      sobrenome,
      telefone,
      idTipo,
    });

    return {
      login,
      senha,
      email,
      nome,
      sobrenome,
      telefone,
      idTipo,
    };
  }
}

export { CreateCollaboratorService };
