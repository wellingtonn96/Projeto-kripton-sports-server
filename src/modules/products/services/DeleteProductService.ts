import AppError from '@shared/errors/AppError';
import { IProductRepository } from '../repositories/IProductRepository';

class DeleteProductService {
  constructor(private productRepository: IProductRepository) {}

  public async execute(id: string): Promise<void> {
    const productExists = await this.productRepository.findOneById(id);

    if (!productExists) {
      throw new AppError('Product not exists');
    }

    await this.productRepository.deleteById(id);
  }
}

export { DeleteProductService };
