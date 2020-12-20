import { Router } from 'express';
import multer from 'multer';
import { connection } from '../database/dbConnection';
import { ProductRepository } from '../repositories/ProductRepository';
import { CreateProductService } from '../services/CreateProductsService';
import uploadConfig from '../config/upload';
import { FindProductService } from '../services/FindProductService';

const productsRoutes = Router();

const upload = multer(uploadConfig);

productsRoutes.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const findProduct = new FindProductService();

    const product = await findProduct.execute(id);

    return response.json(product);
  } catch (error) {
    return response.status(400).json({ err: error.message });
  }
});

productsRoutes.get('/', async (request, response) => {
  try {
    const productRepository = new ProductRepository(connection());

    const results = await productRepository.findAll();

    return response.json(results);
  } catch (error) {
    return response.status(400).json({ err: error.message });
  }
});

productsRoutes.post(
  '/',
  upload.single('produto_img'),
  async (request, response) => {
    try {
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

      const createProducts = new CreateProductService();

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
    } catch (error) {
      return response.status(400).json({ err: error.message });
    }
  },
);

export { productsRoutes };

// module.exports = (application)=>{

//     application.get('/produto/cadastrar',(req, res)=>{
//       if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//             application.app.controllers.produtos.cadastrar(application, req, res);
//           }else {
//             res.render("login/login", {validacao : {}});
//         }
//     });

//    application.post('/produto',(req, res)=>{
//      if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//         application.app.controllers.produtos.salvar(application, req, res);
//       }else {
//         res.render("login/login", {validacao : {}});
//     }
//     });

//   application.delete('/produto/excluir/:id',(req, res)=>{
//      if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//           application.app.controllers.produtos.excluir(application, req, res);
//         }else {
//           res.render("login/login", {validacao : {}});
//       }
//     });

//   application.update('/produto/editar/:id', (req, res)=>{
//      if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//           application.app.controllers.produtos.editar(application, req, res);
//         }else {
//           res.render("login/login", {validacao : {}});
//       }
//     });

//   application.post('/produto/salvar/:id', (req, res)=>{
//      if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//           application.app.controllers.produtos.atualizar(application, req, res);
//         }else {
//           res.render("login/login", {validacao : {}});
//       }
//     });

//   application.get('/produto/detalhes/:id', (req, res)=>{
//      if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//           application.app.controllers.produtos.detalhar(application, req, res);
//         }else {
//           res.render("login/login", {validacao : {}});
//       }
//     });

//   application.get('/produtos', (req, res)=>{
//      if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//           application.app.controllers.produtos.listar(application, req, res);
//         }else {
//           res.render("login/login", {validacao : {}});
//       }
//     });

//   application.get('/produto/categoria', (req, res)=>{
//     if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//           application.app.controllers.produtos.categoriaForm(application, req, res);
//         }else {
//           res.render("login/login", {validacao : {}});
//       }
//     });

//   application.post('/produto/categoria', (req, res)=>{
//     if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//           application.app.controllers.produtos.categoriaSalvar(application, req, res);
//         }else {
//           res.render("login/login", {validacao : {}});
//       }
//     });

//     application.get('/estoque', (req, res)=>{
//       if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//             application.app.controllers.produtos.estoqueProdutos(application, req, res);
//           }else {
//             res.render("login/login", {validacao : {}});
//         }
//       });

//       application.post('/estoque/:id', (req, res)=>{
//         if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//               application.app.controllers.produtos.atualizarEstoque(application, req, res);
//             }else {
//               res.render("login/login", {validacao : {}});
//           }
//         });
// }
