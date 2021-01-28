import AppError from '@shared/errors/AppError';
import { ICollaaboratorsRepository } from '../repositories/ICollaboratorsRepository';

class DeleteCollaboratorService {
  constructor(private collaboratorRepository: ICollaaboratorsRepository) {}

  public async execute(id: string): Promise<void> {
    const results = await this.collaboratorRepository.findOneById(id);

    if (!results) {
      throw new AppError('Collaborator not exists');
    }

    await this.collaboratorRepository.deleteById(id);
  }
}

export { DeleteCollaboratorService };
