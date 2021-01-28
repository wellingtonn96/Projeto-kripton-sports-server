import AppError from '@shared/errors/AppError';
import { CollaboratorRepository } from '../infra/mysql/repositories/CollaboratorsRepository';

class DeleteCollaboratorService {
  public async execute(id: string): Promise<void> {
    const collaboratorRepository = new CollaboratorRepository();

    const results = await collaboratorRepository.findOneById(id);

    if (!results) {
      throw new AppError('Collaborator not exists');
    }

    await collaboratorRepository.deleteById(id);
  }
}

export { DeleteCollaboratorService };
