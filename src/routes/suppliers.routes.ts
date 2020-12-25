import { Router } from 'express';
import { connection } from '../database/dbConnection';
import { SupplierRepository } from '../repositories/SupplierRepository';
import { CreateSupplierService } from '../services/CreateSupplierService';
import { DeleteSupplierService } from '../services/DeleteSupplierService';
import { FindSupplierService } from '../services/FindSupplierService';
import { UpdateSupplierService } from '../services/UpdateSupplierService';

const suppliersRoutes = Router();

suppliersRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteSupplier = new DeleteSupplierService();

  await deleteSupplier.execute(id);

  return response.json();
});

suppliersRoutes.put('/:id', async (request, response) => {
  const { id } = request.params;
  const data = request.body;

  const updateSupplier = new UpdateSupplierService();

  const results = await updateSupplier.execute(id, data);

  return response.json(results);
});

suppliersRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const supplierRepository = new FindSupplierService();

  const results = await supplierRepository.execute(id);

  return response.json(results);
});

suppliersRoutes.get('/', async (request, response) => {
  const supplierRepository = new SupplierRepository(connection());

  const results = await supplierRepository.findAll();

  return response.json(results);
});

suppliersRoutes.post('/', async (request, response) => {
  const { telefone, cnpj, email, endereco } = request.body;

  const createCustomer = new CreateSupplierService();

  const results = await createCustomer.execute({
    telefone,
    cnpj,
    email,
    endereco,
  });

  return response.json(results);
});

export { suppliersRoutes };

// module.exports = (application)=>{

//     application.get('/fornecedor/cadastrar',(req, res)=>{
//         if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//             application.app.controllers.fornecedores.cadastrar(application, req, res);
//         }else {
//             res.render("login/login", {validacao : {}});
//         }
//     });

//      application.post('/fornecedor', (req, res)=>{
//         if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//             application.app.controllers.fornecedores.salvar(application, req, res);
//         }else {
//             res.render("login/login", {validacao : {}});
//         }
//     });

//     application.get('/fornecedor/excluir/:id',(req, res)=>{
//         if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//             application.app.controllers.fornecedores.excluir(application, req, res);
//         }else {
//             res.render("login/login", {validacao : {}});
//         }
//     });

//     application.get('/fornecedor/editar/:id', (req, res)=>{
//         if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//             application.app.controllers.fornecedores.editar(application, req, res);
//         }else {
//             res.render("login/login", {validacao : {}});
//         }
//     });

//     application.post('/fornecedor/salvar/:id',(req, res)=>{
//         if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//             application.app.controllers.fornecedores.atualizar(application, req, res);
//         }else {
//             res.render("login/login", {validacao : {}});
//         }
//     });

//     application.get('/fornecedor/detalhes/:id', (req, res)=>{
//         if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//             application.app.controllers.fornecedores.detalhar(application, req, res);
//         }else {
//             res.render("login/login", {validacao : {}});
//         }
//     });

//     application.get('/fornecedores', (req, res)=>{
//         if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
//             application.app.controllers.fornecedores.listar(application, req, res);
//         }else {
//             res.render("login/login", {validacao : {}});
//         }
//     });
// }
