import { Collaborator } from '../models/Collaborator';
import { CollaboratorRepository } from '../repositories/CollaboratorsRepository';

class UpdataCollaboratorService {
  public async execute(data: Collaborator, id: string): Promise<Collaborator> {
    const collaboratorRepository = new CollaboratorRepository();

    const [collaboratorExists]: any = await collaboratorRepository.findOneById(
      id,
    );

    if (!collaboratorExists) {
      throw new Error('Collaborator not exists');
    }

    await collaboratorRepository.updateById(data, id);

    const [collaborator]: any = await collaboratorRepository.findOneById(id);

    return collaborator;
  }
}

export { UpdataCollaboratorService };
