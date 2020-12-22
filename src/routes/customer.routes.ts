import { Router } from 'express';
import { connection } from '../database/dbConnection';
import { CategoryProductRepository } from '../repositories/CategoryProductRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRoutes = Router();

categoriesRoutes.get('/', async (request, response) => {
  const categoryProductRepository = new CategoryProductRepository(connection());

  const categories = await categoryProductRepository.findAll();

  return response.json(categories);
});

categoriesRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const categoryProductRepository = new CategoryProductRepository(connection());

  const category = await categoryProductRepository.findOneById(id);

  return response.json(category);
});

categoriesRoutes.post('/', async (request, response) => {
  const { name } = request.body;

  const createCategory = new CreateCategoryService();

  const category = await createCategory.execute(name);

  return response.json(category);
});

export { categoriesRoutes };

// module.exports = (application)=>{

//  	application.get('/clientes/cadastrar',(req, res)=>{
// 	 if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
// 			application.app.controllers.clientes.cadastrar(application, req, res);
// 		}else {
// 			res.render("login/login", {validacao : {}});
// 		}
// 	});
// 	application.post('/clientes/salvar',(req, res)=>{
// 	 if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
// 			application.app.controllers.clientes.cliente_salvar(application, req, res);
// 		}else {
// 			res.render("login/login", {validacao : {}});
// 		}
// 	});
// 	application.get('/clientes/excluir/:id', (req, res)=>{
// 	 if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
// 			application.app.controllers.clientes.excluirCliente(application, req, res);
// 		}else {
// 			res.render("login/login", {validacao : {}});
// 		}
// 	});
// 	application.get('/clientes/editar/:id', (req, res)=>{
// 	 if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
// 			application.app.controllers.clientes.editarCliente(application, req, res);
// 		}else {
// 			res.render("login/login", {validacao : {}});
// 		}
// 	});
// 	application.post('/clientes/salvar/:id', (req, res)=>{
// 	 if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
// 			application.app.controllers.clientes.salvarCliente(application, req, res);
// 		}else {
// 			res.render("login/login", {validacao : {}});
// 		}
// 	});
// 	application.get('/clientes/detalhes/:id',(req, res)=>{
// 	 if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
// 			application.app.controllers.clientes.detalhesCliente(application, req, res);
// 		}else {
// 			res.render("login/login", {validacao : {}});
// 		}
// 	});

// 	application.get('/clientes',(req, res)=>{
// 	 if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
// 			application.app.controllers.clientes.clientes(application, req, res);
// 		}else {
// 			res.render("login/login", {validacao : {}});
// 		}
// 	});
// }
