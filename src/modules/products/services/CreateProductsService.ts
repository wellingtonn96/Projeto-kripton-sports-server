import { Product } from '../infra/mysql/entities/Product';
import { IProductRepository } from '../repositories/IProductRepository';

interface IRequest {
  idCategoria: number;
  codigo: number;
  marca: string;
  nome: string;
  descricao: string;
  validade: string;
  produto_img?: string;
  lote: number;
  statusProduto: string;
  valor: number;
  qtdeEstoque: number;
  idFornecedor: number;
}

class CreateProductService {
  constructor(private productRepository: IProductRepository) {}

  public async execute(data: IRequest): Promise<Product> {
    // if (data.produto_img) {
    //   const productImgFilePath = path.join(upload.directory, data.produto_img);
    //   const productImgFileExists = await fs.promises.stat(productImgFilePath);

    //   console.log(productImgFileExists);

    //   if (productImgFileExists) {
    //     await fs.promises.unlink(productImgFilePath);
    //   }
    // }

    const product = await this.productRepository.create(data);

    return product;
  }
}

export { CreateProductService };
