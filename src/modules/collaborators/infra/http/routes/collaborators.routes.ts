import { Router } from 'express';
import { connection } from '@shared/infra/mysql/dbConnection';
import { CollaboratorRepository } from '../../../repositories/CollaboratorsRepository';
import { CreateCollaboratorService } from '../../../services/CreateCollaboratorService';
import { DeleteCollaboratorService } from '../../../services/DeleteCollaboratorService';
import { UpdataCollaboratorService } from '../../../services/UpdataCollaboratorService';

const collaboratorsRoutes = Router();

collaboratorsRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteCollaborator = new DeleteCollaboratorService();

  await deleteCollaborator.execute(id);

  return response.json();
});

collaboratorsRoutes.put('/:id', async (request, response) => {
  const { id } = request.params;
  const data = request.body;

  const deleteCollaborator = new UpdataCollaboratorService();

  const results = await deleteCollaborator.execute(id, data);

  return response.json(results);
});

collaboratorsRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const collaboratorRepository = new CollaboratorRepository(connection());

  const results = await collaboratorRepository.findOneById(id);

  return response.json(results);
});

collaboratorsRoutes.get('/', async (request, response) => {
  const collaboratorRepository = new CollaboratorRepository(connection());

  const results = await collaboratorRepository.findAll();

  return response.json(results);
});

collaboratorsRoutes.post('/', async (request, response) => {
  const data = request.body;

  const createCollaborator = new CreateCollaboratorService();

  const results = await createCollaborator.execute(data);

  return response.json(results);
});

export { collaboratorsRoutes };

// import Router from 'express';
// import CollaboratorsDao from '../models/ColaboradoresDao';

// const collaboratorsRouter = Router()

// collaboratorsRouter.post('/colaboradores/salvar',(req, res)=>{
//   const dadosForm = req.body;

//   const collaboratorsDao = new CollaboratorsDao()
// });

// collaboratorsRouter.delete('/:id', (req, res)=>{
//     collaboratorsRouter.app.controllers.colaboradores.excluirColaborador(collaboratorsRouter, req, res);
// });

// collaboratorsRouter.get('/colaboradores/editar/:id', (req, res)=>{
//   const connection = application.config.dbConnection();
// 	const colaboradoresModel = new application.app.models.ColaboradoresDao(connection);
// 	const id  = req.params.id;
// 	colaboradoresModel.dadosColaborador(id).then(result =>{
// 		res.render("colaboradores/editar", {
// 			dados    : result,
// 			autenticar : {
// 				colaborador : req.session.colaborador,
// 				tipo : req.session.tipo
// 			},
// 		})
// 	}).catch(error =>
// 		console.log(error)
// 	)
// });
// collaboratorsRouter.post('/colaboradores/salvar/:id', (req, res)=>{
//   const connection = application.config.dbConnection();
// 	const colaboradoresModel = new application.app.models.ColaboradoresDao(connection);
// 	const dados = req.body
// 	const id  = req.params.id;
// 	colaboradoresModel.salvarColaborador(dados, id).then(result =>
// 		res.redirect("/colaboradores")
// 	).catch(error =>
// 		console.log(error)
// 	)
// });
// collaboratorsRouter.get('/colaboradores/detalhes/:id',(req, res)=>{
//     collaboratorsRouter.app.controllers.colaboradores.detalhesColaborador(collaboratorsRouter, req, res);
// });

// collaboratorsRouter.get('/colaboradores',(req, res)=>{
//   const connection = application.config.dbConnection();
// 	const colaboradoresModel = new application.app.models.ColaboradoresDao(connection);
// 	colaboradoresModel.listarColaboradores().then(result => {
// 		res.render("colaboradores/colaboradores", {
// 			dados : result,
// 			autenticar : {
// 						colaborador : req.session.colaborador,
// 						tipo : req.session.tipo
// 					},
// 		})
// 	}).catch(error => {
// 		console.log(error)
// 	})
// });

// collaboratorsRouter.post('/colaboradores/nutricionista',(req, res)=>{
//   const input = req.body
// 	req.assert('login','Campo login é obrigatório').notEmpty();
// 	req.assert('login','Campo login é de 4 a 10 caracteres').len(4, 10);
// 	req.assert('senha','Campo senha é obrigatório').notEmpty();
// 	req.assert('email','Campo email é obrigatório').notEmpty().isEmail();
// 	req.assert('nome','Campo nome é obrigatório').notEmpty();
// 	req.assert('sobrenome','Campo sobrenome é obrigatório').notEmpty();
// 	req.assert('telefone','Campo telefone é obrigatório').notEmpty();
// 	req.assert('crn','Campo CRN é obrigatório').notEmpty();
// 	var erros = req.validationErrors();
// 	if(erros){
// 		res.render('colaboradores/nutricionista', {
// 			validacao : erros,
// 			autenticar : {
// 				colaborador : req.session.colaborador,
// 				tipo : req.session.tipo
// 			},
// 		});
// 		return;
// 	}

// 	var dados = {
// 		login : input.login,
// 		senha : input.senha,
// 		email : input.email,
// 		nome  : input.nome,
// 		sobrenome : input.sobrenome,
// 		telefone : input.telefone,
// 		idTipo : 3
// 	};

// 	const connection = application.config.dbConnection();
// 	const colaboradoresModel = new application.app.models.ColaboradoresDao(connection);
// 	colaboradoresModel.cadastrarColaborador(dados).then(colaborador =>{
// 		var nutricionista = {
// 			crn : input.crn,
// 			idcolaborador : colaborador.insertId,
// 		}
// 		colaboradoresModel.cadastrarNutricionista(nutricionista).then(result =>{
// 			res.redirect('/colaboradores')
// 			//res.send(result)
// 		}
// 		).catch(erros =>{
// 			console.log(erros)
// 		})
// 		}
// 		).catch(erros =>{
// 			console.log(erros)
// 		})
// });

// export default {collaboratorsRouter}
