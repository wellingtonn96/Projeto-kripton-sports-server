import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { categoriesRoutes } from './categories.routes';
import { collaboratorsRoutes } from './collaborators.routes';
import { customersRoutes } from './customer.routes';
import { productsRoutes } from './products.routes';
import { sessionsRoutes } from './sessions.routes';

const routes = Router();

routes.use('/categories', ensureAuthenticated, categoriesRoutes);
routes.use('/products', ensureAuthenticated, productsRoutes);
routes.use('/collaborators', ensureAuthenticated, collaboratorsRoutes);
routes.use('/customers', ensureAuthenticated, customersRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
