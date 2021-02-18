import { Router } from 'express';
import { container } from 'tsyringe';
import uploadConfig from '@config/upload';
import { UpdataCollaboratorService } from '@modules/collaborators/services/UpdataCollaboratorService';
import multer from 'multer';
import UploadImageAvatarService from '@modules/collaborators/services/UploadImageAvatarService';
import { CollaboratorRepository } from '../../mysql/repositories/CollaboratorsRepository';
import { CreateCollaboratorService } from '../../../services/CreateCollaboratorService';
import { DeleteCollaboratorService } from '../../../services/DeleteCollaboratorService';

const collaboratorsRoutes = Router();

const upload = multer(uploadConfig);

collaboratorsRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteCollaborator = container.resolve(DeleteCollaboratorService);

  await deleteCollaborator.execute(id);

  return response.json();
});

collaboratorsRoutes.put('/:id', async (request, response) => {
  const { id } = request.params;
  const data = request.body;

  const updateCollaborator = container.resolve(UpdataCollaboratorService);

  const results = await updateCollaborator.execute(id, data);

  return response.json(results);
});

collaboratorsRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const collaboratorRepository = new CollaboratorRepository();

  const results = await collaboratorRepository.findOneById(id);

  return response.json(results);
});

collaboratorsRoutes.patch(
  '/avatar/:id',
  upload.single('avatar'),
  async (request, response) => {
    const { id } = request.params;

    const uploadImageAvatar = container.resolve(UploadImageAvatarService);

    const avatarImage = await uploadImageAvatar.execute({
      filename: request.file.filename,
      id,
    });

    return response.json(avatarImage);
  },
);

collaboratorsRoutes.get('/', async (request, response) => {
  const collaboratorRepository = new CollaboratorRepository();

  const results = await collaboratorRepository.findAll();

  return response.json(results);
});

collaboratorsRoutes.post('/', async (request, response) => {
  const data = request.body;

  const createCollaborator = container.resolve(CreateCollaboratorService);

  const results = await createCollaborator.execute(data);

  return response.json(results);
});

export { collaboratorsRoutes };
