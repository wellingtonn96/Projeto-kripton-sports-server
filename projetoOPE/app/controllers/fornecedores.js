exports.cadastrar = (application, req, res)=>{
	if(req.session.autorizado){
		const colaborador = req.session.colaborador
		res.render("fornecedores/cadastrar", {
			validacao:{},
			colaboradores : colaborador
		});
	} else {
		res.render("login/login", {
			validacao : {}
		});	
	}
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
	if (req.session.autorizado){
		const connection = application.config.dbConnection();
		const fornecedorModel = new application.app.models.FornecedoresDao(connection);
		
		const id  = req.params.id;
	
		fornecedorModel.excluirFornecedor(id).then(result => {
			res.redirect("/fornecedores")
		}).catch(erros => console.log(errors))
	} else {
		res.render("login/login", {validacao : {}});	
	}
}

exports.editar = (application, req, res)=>{
	if(req.session.autorizado){
		const colaborador = req.session.colaborador
		const connection = application.config.dbConnection();
		const fornecedorModel = new application.app.models.FornecedoresDao(connection);
		const id  = req.params.id;
		fornecedorModel.dadosFornecedor(id).then(result => {
			res.render("fornecedores/editar", {
				dados : result,
				colaboradores: colaborador
			})
		}).catch(error => console.log(error))

	}else {
		res.render("login/login", {validacao : {}});	
	}
}

exports.atualizar = (application, req, res)=>{
	if(req.session.autorizado){
		const dados = req.body
		const id  = req.params.id;
		const connection = application.config.dbConnection();
		const fornecedorModel = new application.app.models.FornecedoresDao(connection);
		fornecedorModel.atualizarFornecedor(dados, id).then(result => {
			res.redirect("/fornecedores");
		}).catch(error => console.log(error))

	} else {
		res.render("login/login", {validacao : {}});	
	}
}


exports.detalhar = (application, req, res)=>{
	if(req.session.autorizado){
		const colaborador = req.session.colaborador	
		const connection = application.config.dbConnection();
		const fornecedorModel = new application.app.models.FornecedoresDao(connection);
		const id  = req.params.id;
		fornecedorModel.dadosFornecedor(id).then(result => {
			res.render("fornecedores/detalhes", {
				dados : result,
				colaboradores: colaborador
			});	
		}).catch(error => console.log(error))

	} else {
		res.render("login/login", {validacao : {}});	
	}
}


exports.listar = (application, req, res)=>{
	if(req.session.autorizado){
		const colaborador = req.session.colaborador
		const connection = application.config.dbConnection();
		const fornecedorModel = new application.app.models.FornecedoresDao(connection)
		fornecedorModel.listarFornecedor().then(result => {
			res.render("fornecedores/fornecedores", {
				dados   : result,
				colaboradores: colaborador
			})
		}).catch(error => console.log(error))

	}else {
		res.render("login/login", {validacao : {}});	
	}
}

