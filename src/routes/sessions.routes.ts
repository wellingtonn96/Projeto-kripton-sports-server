import { Router } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
  try {
    const { login, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const results = await authenticateUser.execute({
      login,
      password,
    });

    return response.json(results);
  } catch (error) {
    return response.status(400).json({ err: error.message });
  }
});

export { sessionsRoutes };

// sessionsRouter.get('/', (request, response)=>{

// });

// sessionsRouter.post('/autenticar', (request, response)=>{
//   const dadosForm = request.body;
// 	request.assert('login','Campo login é obrigatório').notEmpty();
// 	request.assert('senha','Campo senha é obrigatório').notEmpty();
// 	const erros = request.validationErrors();
// 	if(erros){
// 		res.render("login/login", {
// 			validacao : erros,
// 		});
// 		return;
// 	}
// 	const connection = application.config.dbConnection();
// 	const colaboradoresModel = new application.app.models.ColaboradoresDao(connection);
// 	colaboradoresModel.autenticar(dadosForm, request, res).then((results) => {
// 		var row =  results[0]
// 			if(row != undefined){
// 				//console.log(row)
// 				request.session.autorizado = true;
// 				request.session.colaborador = row.nome;
// 				request.session.tipo = row.idTipo
// 				request.session.idColaborador = row.idColaborador
// 			}
// 		}
// 	}).catch((err) => {
// 		var erro = [{
// 			msg: err
// 		}]
// 		res.render("login/login", {
// 			validacao : erro,
// 		});
// 	});
// });
