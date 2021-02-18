import { inject, injectable } from 'tsyringe';
import { ICollaboratorsRepository } from '../repositories/ICollaboratorsRepository';

interface IUploadImageAvatarService {
  filename: string;
  id: string;
}

@injectable()
class UploadImageAvatarService {
  constructor(
    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorsRepository,
  ) {}

  public async execute({ filename, id }: IUploadImageAvatarService) {
    const uploadImageAvatar = await this.collaboratorRepository.updateImageAvatarById(
      { filename, id },
    );

    return uploadImageAvatar;
  }
}

export default UploadImageAvatarService;
