exports.cadastrar = (application, req, res)=>{
	res.render("fornecedores/cadastrar", {
		validacao:{},
		autenticar : {
			colaborador : req.session.colaborador,
			tipo : req.session.tipo
		},
	});	
}


exports.salvar = (application, req, res)=>{
    const dados = req.body;
	req.assert('cnpj','Campo CNPJ é obrigatório').notEmpty();
	req.assert('email','Campo email é obrigatório').notEmpty();
	req.assert('endereco','Campo endereço é obrigatório').notEmpty();
	req.assert('telefone','Campo telefone é obrigatório').notEmpty();
	const erros = req.validationErrors();
	if(erros){
		res.render('fornecedores/cadastrar', {validacao : erros});
		return;
	}
	const connection = application.config.dbConnection();
	const fornecedorModel = new application.app.models.FornecedoresDao(connection);
	fornecedorModel.cadastrarFornecedor(dados).then(result => 
		res.redirect('/fornecedores')
		).catch(erros => console.log(erros))
}


exports.excluir = (application, req, res)=>{
	const connection = application.config.dbConnection();
	const fornecedorModel = new application.app.models.FornecedoresDao(connection);
	const id  = req.params.id;
	fornecedorModel.excluirFornecedor(id).then(result => {
		res.redirect("/fornecedores")
	}).catch(erros => console.log(errors))
}

exports.editar = (application, req, res)=>{
	const connection = application.config.dbConnection();
	const fornecedorModel = new application.app.models.FornecedoresDao(connection);
	const id  = req.params.id;
	fornecedorModel.dadosFornecedor(id).then(result => {
		res.render("fornecedores/editar", {
			dados : result,
			autenticar : {
				colaborador : req.session.colaborador,
				tipo : req.session.tipo
			},
		})
	}).catch(error => console.log(error))
}

exports.atualizar = (application, req, res)=>{
	const dados = req.body
	const id  = req.params.id;
	const connection = application.config.dbConnection();
	const fornecedorModel = new application.app.models.FornecedoresDao(connection);
	fornecedorModel.atualizarFornecedor(dados, id).then(result => {
		res.redirect("/fornecedores");
	}).catch(error => console.log(error))	
}


exports.detalhar = (application, req, res)=>{
	const connection = application.config.dbConnection();
	const fornecedorModel = new application.app.models.FornecedoresDao(connection);
	const id  = req.params.id;
	fornecedorModel.dadosFornecedor(id).then(result => {
		res.render("fornecedores/detalhes", {
			dados : result,
			autenticar : {
				colaborador : req.session.colaborador,
				tipo : req.session.tipo
			},
		});	
	}).catch(error => console.log(error))
}


exports.listar = (application, req, res)=>{
	const connection = application.config.dbConnection();
	const fornecedorModel = new application.app.models.FornecedoresDao(connection)
	fornecedorModel.listarFornecedor().then(result => {
		res.render("fornecedores/fornecedores", {
			dados   : result,
			autenticar : {
				colaborador : req.session.colaborador,
				tipo : req.session.tipo
			},
		})
	}).catch(error => console.log(error))
}

