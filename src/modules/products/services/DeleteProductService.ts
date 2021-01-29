import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../repositories/IProductRepository';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const productExists = await this.productRepository.findOneById(id);

    if (!productExists) {
      throw new AppError('Product not exists');
    }

    await this.productRepository.deleteById(id);
  }
}

export { DeleteProductService };
