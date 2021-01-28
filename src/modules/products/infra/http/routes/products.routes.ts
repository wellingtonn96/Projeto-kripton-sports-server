import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { ProductRepository } from '../../mysql/repositories/ProductRepository';
import { CreateProductService } from '../../../services/CreateProductsService';
import { FindProductService } from '../../../services/FindProductService';
import { UpdateProductService } from '../../../services/UpdateProductService';
import { DeleteProductService } from '../../../services/DeleteProductService';

const productsRoutes = Router();

const upload = multer(uploadConfig);

productsRoutes.get('/expirationDate', async (request, response) => {
  const productRepository = new ProductRepository();

  const products = await productRepository.getExpirationDate();

  return response.json(products);
});

productsRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteProduct = new DeleteProductService(new ProductRepository());

  await deleteProduct.execute(id);

  return response.json().send();
});

productsRoutes.put('/:id', async (request, response) => {
  const { id } = request.params;
  const data = request.body;

  const updateProduct = new UpdateProductService(new ProductRepository());

  const product = await updateProduct.execute(id, data);

  return response.json(product);
});

productsRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const findProduct = new FindProductService(new ProductRepository());

  const product = await findProduct.execute(id);

  return response.json(product);
});

productsRoutes.get('/', async (request, response) => {
  const productRepository = new ProductRepository();

  const results = await productRepository.findAll();

  return response.json(results);
});

productsRoutes.post(
  '/',
  upload.single('produto_img'),
  async (request, response) => {
    const {
      idCategoria,
      codigo,
      marca,
      nome,
      descricao,
      validade,
      lote,
      statusProduto,
      valor,
      qtdeEstoque,
      idFornecedor,
    } = request.body;

    const createProducts = new CreateProductService(new ProductRepository());

    const product = await createProducts.execute({
      idCategoria,
      codigo,
      marca,
      nome,
      produto_img: request.file.filename,
      descricao,
      validade,
      lote,
      statusProduto,
      valor,
      qtdeEstoque,
      idFornecedor,
    });

    return response.json(product);
  },
);

export { productsRoutes };
