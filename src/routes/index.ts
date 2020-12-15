import { Router } from 'express';
import { collaboratorsRoutes } from './collaborators.routes';
import { sessionsRoutes } from './sessions.routes';

const routes = Router();

routes.use('/collaborator', collaboratorsRoutes);
routes.use('/session', sessionsRoutes);

export default routes;
