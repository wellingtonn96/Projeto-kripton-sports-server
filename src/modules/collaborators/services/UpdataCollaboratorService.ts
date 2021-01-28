import AppError from '@shared/errors/AppError';
import { Collaborator } from '../infra/mysql/entities/Collaborator';
import { ICollaaboratorsRepository } from '../repositories/ICollaboratorsRepository';

class UpdataCollaboratorService {
  constructor(private collaboratorRepository: ICollaaboratorsRepository) {}

  public async execute(
    id: string,
    data: Collaborator,
  ): Promise<Collaborator | undefined> {
    const collaboratorExists = await this.collaboratorRepository.findOneById(
      id,
    );

    if (!collaboratorExists) {
      throw new AppError('Collaborator not exists');
    }

    const collaborator = await this.collaboratorRepository.updateById(id, data);

    return collaborator;
  }
}

export { UpdataCollaboratorService };
