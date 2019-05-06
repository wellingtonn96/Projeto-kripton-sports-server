
exports.clientes = (application, req, res)=>{
	const colaborador = req.session.colaborador
	const connection = application.config.dbConnection();
	const clientesModel = new application.app.models.ClienteDao(connection);

	clientesModel.clientes().then(result => {
		res.render("clientes/clientes", {
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
	const colaborador = req.session.colaborador
	res.render('clientes/cadastrar', {
		validacao : {},
		autenticar : {
			colaborador : req.session.colaborador,
			tipo : req.session.tipo
		},
		dados: {}
	});
}



//create
exports.cliente_salvar = (application, req, res)=>{
	const colaborador = req.session.colaborador
	const dadosForm = req.body;
	req.assert('login','Campo login é obrigatório').notEmpty();
	req.assert('login','Campo login é de 4 a 10 caracteres').len(4, 10);
	req.assert('senha','Campo senha é obrigatório').notEmpty();
	req.assert('email','Campo email é obrigatório').notEmpty();
	req.assert('email','Campo sobrenome é obrigatório').notEmpty();
	req.assert('nome','Campo nome é obrigatório').notEmpty();
	req.assert('telefone','Campo telefone é obrigatório').notEmpty()
	const erros = req.validationErrors();
	
	if(erros){
		res.render('clientes/cadastrar', {
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
	const clientesModel = new application.app.models.ClienteDao(connection);
	clientesModel.cadastrarCliente(dadosForm).then(result =>
		res.redirect('/clientes')
	).catch(erros =>{
		console.log(erros)
	})
}




//Update
exports.editarCliente = (application, req, res)=>{
	const colaborador = req.session.colaborador
	const connection = application.config.dbConnection();
	const clientesModel = new application.app.models.ClienteDao(connection);
	const id  = req.params.id;
	clientesModel.dadosCliente(id).then(result =>{
		res.render("clientes/editar", {
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





exports.salvarCliente = (application, req, res)=>{
	const colaborador = req.session.colaborador
	const connection = application.config.dbConnection();
	const clientesModel = new application.app.models.ClienteDao(connection);
	const dados = req.body
	const id  = req.params.id;
	clientesModel.salvarCliente(dados, id).then(result =>
		res.redirect("/clientes")
	).catch(error =>
		console.log(error)
	)
}



exports.detalhesCliente = (application, req, res)=>{
	const colaborador = req.session.colaborador
	const connection = application.config.dbConnection();
	const clientesModel = new application.app.models.ClienteDao(connection);
	const id  = req.params.id;
	clientesModel.dadosCliente(id).then(result =>
		res.render("clientes/detalhes", {
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
exports.excluirCliente = function(application, req, res){
	const colaborador = req.session.colaborador
	const connection = application.config.dbConnection();
	const clientesModel = new application.app.models.ClienteDao(connection);
	const id  = req.params.id;
	clientesModel.excluirCliente(id).then(result =>
	res.redirect("/clientes")
	)
	.catch(error => 
		console.log(error)
	)
}



