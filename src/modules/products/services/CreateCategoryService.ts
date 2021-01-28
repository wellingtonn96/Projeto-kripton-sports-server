import AppError from '@shared/errors/AppError';
import { CategoryProduct } from '../infra/mysql/entities/CategoryProduct';
import { CategoryProductRepository } from '../infra/mysql/repositories/CategoryProductRepository';

class CreateCategoryService {
  public async execute(name: string): Promise<CategoryProduct> {
    const categoryProductRepository = new CategoryProductRepository();

    const categoryExists = await categoryProductRepository.findByName(name);

    if (categoryExists) {
      throw new AppError('category already exists');
    }

    const category = await categoryProductRepository.create(name);

    return category;
  }
}

export { CreateCategoryService };
