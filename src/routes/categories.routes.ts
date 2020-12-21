import { Router } from 'express';
import { connection } from '../database/dbConnection';
import { CategoryProductRepository } from '../repositories/CategoryProductRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRoutes = Router();

categoriesRoutes.get('/', async (request, response) => {
  try {
    const categoryProductRepository = new CategoryProductRepository(
      connection(),
    );

    const categories = await categoryProductRepository.findAll();

    return response.json(categories);
  } catch (error) {
    return response.status(400).json({ err: error.message });
  }
});

categoriesRoutes.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const categoryProductRepository = new CategoryProductRepository(
      connection(),
    );

    const category = await categoryProductRepository.findOneById(id);

    return response.json(category);
  } catch (error) {
    return response.status(400).json({ err: error.message });
  }
});

categoriesRoutes.post('/', async (request, response) => {
  try {
    const { name } = request.body;

    const createCategory = new CreateCategoryService();

    const category = await createCategory.execute(name);

    return response.json(category);
  } catch (error) {
    return response.status(400).json({ err: error.message });
  }
});

export { categoriesRoutes };
