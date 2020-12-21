import { Collaborator } from '../models/Collaborator';
import { CollaboratorRepository } from '../repositories/CollaboratorsRepository';
import { connection } from '../database/dbConnection';
import AppError from '../errors/AppError';

class UpdataCollaboratorService {
  public async execute(id: string, data: Collaborator): Promise<Collaborator> {
    const collaboratorRepository = new CollaboratorRepository(connection());

    const collaboratorExists = await collaboratorRepository.findOneById(id);

    if (!collaboratorExists) {
      throw new AppError('Collaborator not exists');
    }

    const collaborator = await collaboratorRepository.updateById(id, data);

    return collaborator;
  }
}

export { UpdataCollaboratorService };
