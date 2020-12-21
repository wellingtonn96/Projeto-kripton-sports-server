import { connection } from '../database/dbConnection';
import { ProductRepository } from '../repositories/ProductRepository';

class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const productRepository = new ProductRepository(connection());

    const productExists = await productRepository.findOneById(id);

    if (!productExists) {
      throw new Error('Product not exists');
    }

    await productRepository.deleteById(id);
  }
}

export { DeleteProductService };
