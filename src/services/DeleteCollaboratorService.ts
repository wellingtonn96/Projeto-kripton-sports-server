import { CollaboratorRepository } from '../repositories/CollaboratorsRepository';

class DeleteCollaboratorService {
  public async execute(id: string): Promise<void> {
    const collaboratorRepository = new CollaboratorRepository();

    const [results]: any = await collaboratorRepository.findOneById(id);

    if (!results) {
      throw new Error('Collaborator not exists');
    }

    await collaboratorRepository.deleteById(id);
  }
}

export { DeleteCollaboratorService };
