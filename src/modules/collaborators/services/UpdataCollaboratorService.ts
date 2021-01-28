import AppError from '@shared/errors/AppError';
import { Collaborator } from '../infra/mysql/entities/Collaborator';
import { CollaboratorRepository } from '../infra/mysql/repositories/CollaboratorsRepository';

class UpdataCollaboratorService {
  public async execute(id: string, data: Collaborator): Promise<Collaborator> {
    const collaboratorRepository = new CollaboratorRepository();

    const collaboratorExists = await collaboratorRepository.findOneById(id);

    if (!collaboratorExists) {
      throw new AppError('Collaborator not exists');
    }

    const collaborator = await collaboratorRepository.updateById(id, data);

    return collaborator;
  }
}

export { UpdataCollaboratorService };
