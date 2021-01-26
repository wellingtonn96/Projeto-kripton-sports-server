import AppError from '@shared/errors/AppError';
import { connection } from '@shared/infra/mysql/dbConnection';
import { CollaboratorRepository } from '../repositories/CollaboratorsRepository';

class DeleteCollaboratorService {
  public async execute(id: string): Promise<void> {
    const collaboratorRepository = new CollaboratorRepository(connection());

    const results = await collaboratorRepository.findOneById(id);

    if (!results) {
      throw new AppError('Collaborator not exists');
    }

    await collaboratorRepository.deleteById(id);
  }
}

export { DeleteCollaboratorService };
