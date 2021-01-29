import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserService } from '../../../services/AuthenticateUserService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
  const { login, password } = request.body;

  const authenticateUser = container.resolve(AuthenticateUserService);

  const results = await authenticateUser.execute({
    login,
    password,
  });

  return response.json(results);
});

export { sessionsRoutes };
