
exports.colaboradores = (application, req, res)=>{
	const connection = application.config.dbConnection();
	const colaboradoresModel = new application.app.models.ColaboradoresDao(connection);
	colaboradoresModel.listarColaboradores().then(result => {
		res.render("colaboradores/colaboradores", {
			dados : result,
			autenticar : {
						colaborador : req.session.colaborador,
						tipo : req.session.tipo
					},
		})
	}).catch(error => {
		console.log(error)
	})
}




exports.cadastrar = (application, req, res)=>{
	res.render('colaboradores/cadastrar', {
		validacao : {},
		autenticar : {
			colaborador : req.session.colaborador,
			tipo : req.session.tipo
		},
		dados: {}
	});
}



//create
exports.colaborador_salvar = (application, req, res)=>{
	const dadosForm = req.body;
	req.assert('login','Campo login é obrigatório').notEmpty();
	req.assert('login','Campo login é de 4 a 10 caracteres').len(4, 10);
	req.assert('senha','Campo senha é obrigatório').notEmpty();
	req.assert('email','Campo email é obrigatório').notEmpty();
	req.assert('email','Campo sobrenome é obrigatório').notEmpty();
	req.assert('nome','Campo nome é obrigatório').notEmpty();
	req.assert('telefone','Campo telefone é obrigatório').notEmpty();
	req.assert('idTipo','Campo tipo é obrigatório').notEmpty();
	const erros = req.validationErrors();
	
	if(erros){
		res.render('colaboradores/cadastrar', {
			validacao : erros,
			autenticar : {
				colaborador : req.session.colaborador,
				tipo : req.session.tipo
			},
			dados: dadosForm
		});
		return;
	}

	const connection = application.config.dbConnection();
	const colaboradoresModel = new application.app.models.ColaboradoresDao(connection);
	colaboradoresModel.cadastrarColaborador(dadosForm).then(result =>
		res.redirect('/colaboradores')
	).catch(erros =>{
		console.log(erros)
	})
}




//Update
exports.editarColaborador = (application, req, res)=>{
	const connection = application.config.dbConnection();
	const colaboradoresModel = new application.app.models.ColaboradoresDao(connection);
	const id  = req.params.id;
	colaboradoresModel.dadosColaborador(id).then(result =>{
		res.render("colaboradores/editar", {
			dados    : result,
			autenticar : {
				colaborador : req.session.colaborador,
				tipo : req.session.tipo
			},
		})
	}).catch(error =>
		console.log(error)
	)	
}





exports.salvarColaborador = (application, req, res)=>{
	const connection = application.config.dbConnection();
	const colaboradoresModel = new application.app.models.ColaboradoresDao(connection);
	const dados = req.body
	const id  = req.params.id;
	colaboradoresModel.salvarColaborador(dados, id).then(result =>
		res.redirect("/colaboradores")
	).catch(error =>
		console.log(error)
	)
}



exports.detalhesColaborador = (application, req, res)=>{
	const connection = application.config.dbConnection();
	const colaboradoresModel = new application.app.models.ColaboradoresDao(connection);
	const id  = req.params.id;
	colaboradoresModel.dadosColaborador(id).then(result =>
	res.render("colaboradores/detalhes", {
		dados : result,
		autenticar : {
			colaborador : req.session.colaborador,
			tipo : req.session.tipo
		},
	})).catch(error => 
		console.log(error)
	)
}



//Delete
exports.excluirColaborador = function(application, req, res){
	const connection = application.config.dbConnection();
	const colaboradoresModel = new application.app.models.ColaboradoresDao(connection);
	const id  = req.params.id;
	colaboradoresModel.excluirColaborador(id).then(result =>
	res.redirect("/colaboradores")
	)
	.catch(error => 
		console.log(error)
	);
}




exports.cadastrarNutricionista = (application, req, res)=>{
	res.render("colaboradores/nutricionista", {
		validacao:{},
		autenticar : {
			colaborador : req.session.colaborador,
			tipo : req.session.tipo
		},
	});
}


exports.nutricionistaSalvar = function(application, req, res){
	const input = req.body
	req.assert('login','Campo login é obrigatório').notEmpty();
	req.assert('login','Campo login é de 4 a 10 caracteres').len(4, 10);
	req.assert('senha','Campo senha é obrigatório').notEmpty();
	req.assert('email','Campo email é obrigatório').notEmpty().isEmail();
	req.assert('nome','Campo nome é obrigatório').notEmpty();
	req.assert('sobrenome','Campo sobrenome é obrigatório').notEmpty();
	req.assert('telefone','Campo telefone é obrigatório').notEmpty();
	req.assert('crn','Campo CRN é obrigatório').notEmpty();
	var erros = req.validationErrors();
	if(erros){
		res.render('colaboradores/nutricionista', {
			validacao : erros,
			autenticar : {
				colaborador : req.session.colaborador,
				tipo : req.session.tipo
			},
		});
		return;
	}

	var dados = {
		login : input.login,
		senha : input.senha,
		email : input.email,
		nome  : input.nome,
		sobrenome : input.sobrenome,
		telefone : input.telefone,
		idTipo : 3
	};

	const connection = application.config.dbConnection();
	const colaboradoresModel = new application.app.models.ColaboradoresDao(connection);
	colaboradoresModel.cadastrarColaborador(dados).then(colaborador =>{
		var nutricionista = {
			crn : input.crn,
			idcolaborador : colaborador.insertId,
		}
		colaboradoresModel.cadastrarNutricionista(nutricionista).then(result =>{
			res.redirect('/colaboradores')
			//res.send(result)
		}
		).catch(erros =>{
			console.log(erros)
		})
		}
		).catch(erros =>{
			console.log(erros)
		})

}
