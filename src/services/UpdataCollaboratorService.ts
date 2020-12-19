import { Collaborator } from '../models/Collaborator';
import { CollaboratorRepository } from '../repositories/CollaboratorsRepository';
import { connection } from '../database/dbConnection';

class UpdataCollaboratorService {
  public async execute(data: Collaborator, id: string): Promise<Collaborator> {
    const collaboratorRepository = new CollaboratorRepository(connection());

    const collaboratorExists = await collaboratorRepository.findOneById(id);

    if (!collaboratorExists) {
      throw new Error('Collaborator not exists');
    }

    await collaboratorRepository.updateById(data, id);

    const collaborator = await collaboratorRepository.findOneById(id);

    return collaborator;
  }
}

export { UpdataCollaboratorService };
