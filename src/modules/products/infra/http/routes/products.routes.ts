import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { container } from 'tsyringe';
import UploadImageProductService from '@modules/products/services/UploadImaageProductService';
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

  const deleteProduct = container.resolve(DeleteProductService);

  await deleteProduct.execute(id);

  return response.json().send();
});

productsRoutes.put('/:id', async (request, response) => {
  const { id } = request.params;
  const data = request.body;

  const updateProduct = container.resolve(UpdateProductService);

  const product = await updateProduct.execute(id, data);

  return response.json(product);
});

productsRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const findProduct = container.resolve(FindProductService);

  const product = await findProduct.execute(id);

  return response.json(product);
});

productsRoutes.get('/', async (request, response) => {
  const productRepository = new ProductRepository();

  const results = await productRepository.findAll();

  return response.json(results);
});

productsRoutes.patch(
  '/:id',
  upload.single('produto_img'),
  async (request, response) => {
    const { id } = request.params;

    const uploaImage = container.resolve(UploadImageProductService);

    const productImage = await uploaImage.execute(request.file.filename, id);

    return response.json(productImage);
  },
);

productsRoutes.post('/', async (request, response) => {
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

  const createProducts = container.resolve(CreateProductService);

  const product = await createProducts.execute({
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
  });

  return response.json(product);
});

export { productsRoutes };
