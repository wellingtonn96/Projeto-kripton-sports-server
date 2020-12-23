import { Router } from 'express';
import { CreateSupplierService } from '../services/CreateSupplierService';
// import { connection } from '../database/dbConnection';

const suppliersRoutes = Router();

// suppliersRoutes.delete('/:id', async (request, response) => {
//   const { id } = request.params;

//   const deleteCollaborator = new DeleteCustomerService();

//   await deleteCollaborator.execute(id);

//   return response.json();
// });

// suppliersRoutes.put('/:id', async (request, response) => {
//   const { id } = request.params;
//   const data = request.body;

//   const deleteCollaborator = new UpdateCustomerService();

//   const results = await deleteCollaborator.execute(id, data);

//   return response.json(results);
// });

// suppliersRoutes.get('/:id', async (request, response) => {
//   const { id } = request.params;

//   const customerRepository = new FindCustomerService();

//   const results = await customerRepository.execute(id);

//   return response.json(results);
// });

// suppliersRoutes.get('/', async (request, response) => {
//   const customerRepository = new CustomerRepository(connection());

//   const results = await customerRepository.findAll();

//   return response.json(results);
// });

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
