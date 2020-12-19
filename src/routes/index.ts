import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { collaboratorsRoutes } from './collaborators.routes';
import { productsRoutes } from './products.routes';
import { sessionsRoutes } from './sessions.routes';

const routes = Router();

routes.use('/products', ensureAuthenticated, productsRoutes);
routes.use('/collaborator', ensureAuthenticated, collaboratorsRoutes);
routes.use('/session', sessionsRoutes);

export default routes;
