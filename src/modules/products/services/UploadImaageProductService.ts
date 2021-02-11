import { inject, injectable } from 'tsyringe';
import { Product } from '../infra/mysql/entities/Product';
import { IProductRepository } from '../repositories/IProductRepository';

@injectable()
class UploadImageProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute(productImg: string, id: string): Promise<Product> {
    const product = await this.productRepository.updateImageProductById(
      id,
      productImg,
    );

    return product;
  }
}

export default UploadImageProductService;
