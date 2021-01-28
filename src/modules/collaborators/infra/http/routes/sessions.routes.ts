import { Router } from 'express';
import { AuthenticateUserService } from '../../../services/AuthenticateUserService';
import { CollaboratorRepository } from '../../mysql/repositories/CollaboratorsRepository';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
  const { login, password } = request.body;

  const authenticateUser = new AuthenticateUserService(
    new CollaboratorRepository(),
  );

  const results = await authenticateUser.execute({
    login,
    password,
  });

  return response.json(results);
});

export { sessionsRoutes };
