import { Router } from 'express';
import collaboratorsRoutes from './colaboradores.routes';

const routes = Router();

routes.use('/collaborator', collaboratorsRoutes);

export default routes;
