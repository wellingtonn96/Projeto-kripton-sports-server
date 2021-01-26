import { Router } from 'express';
import { connection } from '@shared/infra/mysql/dbConnection';
import { CategoryProductRepository } from '../../../repositories/CategoryProductRepository';
import { CreateCategoryService } from '../../../services/CreateCategoryService';

const categoriesRoutes = Router();

categoriesRoutes.get('/', async (request, response) => {
  const categoryProductRepository = new CategoryProductRepository(connection());

  const categories = await categoryProductRepository.findAll();

  return response.json(categories);
});

categoriesRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const categoryProductRepository = new CategoryProductRepository(connection());

  const category = await categoryProductRepository.findOneById(id);

  return response.json(category);
});

categoriesRoutes.post('/', async (request, response) => {
  const { name } = request.body;

  const createCategory = new CreateCategoryService();

  const category = await createCategory.execute(name);

  return response.json(category);
});

export { categoriesRoutes };
