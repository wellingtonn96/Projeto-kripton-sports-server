// import { Router } from 'express';

// const sessionsRouter = Router()


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



// export default sessionsRouter
