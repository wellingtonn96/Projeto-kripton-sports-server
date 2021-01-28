import { Router } from 'express';
import { CollaboratorRepository } from '../../mysql/repositories/CollaboratorsRepository';
import { CreateCollaboratorService } from '../../../services/CreateCollaboratorService';
import { DeleteCollaboratorService } from '../../../services/DeleteCollaboratorService';
import { UpdataCollaboratorService } from '../../../services/UpdataCollaboratorService';

const collaboratorsRoutes = Router();

collaboratorsRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteCollaborator = new DeleteCollaboratorService(
    new CollaboratorRepository(),
  );

  await deleteCollaborator.execute(id);

  return response.json();
});

collaboratorsRoutes.put('/:id', async (request, response) => {
  const { id } = request.params;
  const data = request.body;

  const deleteCollaborator = new UpdataCollaboratorService(
    new CollaboratorRepository(),
  );

  const results = await deleteCollaborator.execute(id, data);

  return response.json(results);
});

collaboratorsRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const collaboratorRepository = new CollaboratorRepository();

  const results = await collaboratorRepository.findOneById(id);

  return response.json(results);
});

collaboratorsRoutes.get('/', async (request, response) => {
  const collaboratorRepository = new CollaboratorRepository();

  const results = await collaboratorRepository.findAll();

  return response.json(results);
});

collaboratorsRoutes.post('/', async (request, response) => {
  const data = request.body;

  const createCollaborator = new CreateCollaboratorService(
    new CollaboratorRepository(),
  );

  const results = await createCollaborator.execute(data);

  return response.json(results);
});

export { collaboratorsRoutes };
