import { CollaboratorRepository } from '../repositories/CollaboratorsRepository';
import { connection } from '../database/dbConnection';

class DeleteCollaboratorService {
  public async execute(id: string): Promise<void> {
    const collaboratorRepository = new CollaboratorRepository(connection());

    const results = await collaboratorRepository.findOneById(id);

    if (!results) {
      throw new Error('Collaborator not exists');
    }

    await collaboratorRepository.deleteById(id);
  }
}

export { DeleteCollaboratorService };
