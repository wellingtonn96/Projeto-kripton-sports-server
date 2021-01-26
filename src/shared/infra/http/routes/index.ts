import { Router } from 'express';
import { ensureAuthenticated } from '@modules/collaborators/infra/http/middlewares/ensureAuthenticated';
import { categoriesRoutes } from '@modules/products/infra/http/routes/categories.routes';
import { collaboratorsRoutes } from '@modules/collaborators/infra/http/routes/collaborators.routes';
import { customersRoutes } from '@modules/customers/infra/http/routes/customer.routes';
import { productsRoutes } from '@modules/products/infra/http/routes/products.routes';
import { sessionsRoutes } from '@modules/collaborators/infra/http/routes/sessions.routes';
import { suppliersRoutes } from '@modules/suppliers/infra/http/routes/suppliers.routes';

const routes = Router();

routes.use('/categories', ensureAuthenticated, categoriesRoutes);
routes.use('/products', ensureAuthenticated, productsRoutes);
routes.use('/collaborators', ensureAuthenticated, collaboratorsRoutes);
routes.use('/customers', ensureAuthenticated, customersRoutes);
routes.use('/suppliers', ensureAuthenticated, suppliersRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
