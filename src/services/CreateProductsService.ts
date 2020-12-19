import { ProductRepository } from '../repositories/ProductRepository';
import { connection } from '../database/dbConnection';
import { Product } from '../models/Product';

interface IRequest {
  idCategoria: number;
  codigo: number;
  marca: string;
  nome: string;
  descricao: string;
  validade: string;
  lote: number;
  statusProduto: string;
  valor: number;
  qtdeEstoque: number;
  idFornecedor: number;
}

class CreateProductService {
  public async execute(data: IRequest): Promise<Product> {
    const productRepository = new ProductRepository(connection());

    const product = await productRepository.create(data);

    return product;
  }
}

export { CreateProductService };
