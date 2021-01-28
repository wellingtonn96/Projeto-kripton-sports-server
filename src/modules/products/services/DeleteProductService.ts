import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../infra/mysql/repositories/ProductRepository';

class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const productRepository = new ProductRepository();

    const productExists = await productRepository.findOneById(id);

    if (!productExists) {
      throw new AppError('Product not exists');
    }

    await productRepository.deleteById(id);
  }
}

export { DeleteProductService };
