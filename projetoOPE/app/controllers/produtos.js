exports.cadastrar = (application, req, res)=>{
	if(req.session.autorizado){
		const colaborador = req.session.colaborador
		const connection = application.config.dbConnection();
		const produtosModel = new application.app.models.ProdutosDao(connection);
		const fornecedorModel = new application.app.models.FornecedoresDao(connection)
		fornecedorModel.listarFornecedor().then(fornecedor => {
			produtosModel.listarCategoria().then(categoria => {
				res.render('produtos/cadastrar', {
					validacao : {},
					colaboradores  : colaborador,
					dadosFornecedor : fornecedor,
					dadosCategoria : categoria,
					dados : {}
				});
			}).catch(error => console.log(error))
		}).catch(error => console.log(error))
	} else {
		res.render("login/login", {validacao : {}});	
	}
}




exports.salvar = (application, req, res)=>{
	if(req.session.autorizado){
		const colaborador = req.session.colaborador
		const dados = req.body;
		console.log(dados)
		req.assert('codigo','Campo codigo é obrigatório').notEmpty();
		req.assert('codigo','Campo codigo é tipo numeŕico de 5 a 11 caracteres').isFloat().len(5, 11);
		req.assert('marca','Campo marca é obrigatório').notEmpty();
		req.assert('nome','Campo nome é obrigatório').notEmpty();
		req.assert('descricao','Campo descrição é obrigatório').notEmpty();
		req.assert('validade','Campo validade é obrigatório').notEmpty();
		req.assert('lote','Campo lote é obrigatório').notEmpty();
		req.assert('lote','Campo lote é numérico 5 a 8 caracteres').isFloat().len(5,8);
		req.assert('statusProduto','status do produto nome é obrigatório').notEmpty();
		req.assert('valor','Campo valor é obrigatório').notEmpty();
		req.assert('valor','Campo valor é tipo numérico').isFloat();
		
		const erros = req.validationErrors();
		const connection = application.config.dbConnection();
		if(erros){
			const produtosModel = new application.app.models.ProdutosDao(connection);
			const fornecedorModel = new application.app.models.FornecedoresDao(connection)
			fornecedorModel.listarFornecedor().then(fornecedor => {
				produtosModel.listarCategoria().then(categoria => {
					res.render('produtos/cadastrar', {
						validacao : erros,
						colaboradores  : colaborador,
						dadosFornecedor : fornecedor,
						dadosCategoria : categoria,
						dados : dados
					});
				}).catch(error => console.log(error))
			}).catch(error => console.log(error))
			return;
		}

		const produtosModel = new application.app.models.ProdutosDao(connection);
		produtosModel.cadastrarProduto(dados).then(result=>
			res.redirect('/produtos')
		).catch(error => console.log(error))
			
	} else {
		res.render("login/login", {validacao : {}});	
	}
}





exports.excluir = (application, req, res)=>{
	if(req.session.autorizado){
		const connection = application.config.dbConnection();
		const produtosModel = new application.app.models.ProdutosDao(connection);
		const id  = req.params.id;
		produtosModel.excluirProduto(id).then(result => 
			res.redirect("/produtos")
			).catch(error => console.log(error))
	}else {
		res.render("login/login", {validacao : {}});	
	}
}




exports.editar = (application, req, res)=>{
	if(req.session.autorizado){
		const colaborador = req.session.colaborador
		const connection = application.config.dbConnection();
		const produtosModel = new application.app.models.ProdutosDao(connection);
		const id  = req.params.id
		produtosModel.dadosProduto(id).then(result => {
			res.render("produtos/editar", {
				dados    : result,
				colaboradores : colaborador
			})
		}).catch(error => console.log(error))

	}else {
		res.render("login/login", {validacao : {}});	
	}
}



exports.atualizar = (application, req, res)=>{
	if(req.session.autorizado){
		const connection = application.config.dbConnection();
		const produtosModel = new application.app.models.ProdutosDao(connection);
		const dados = req.body
		const id  = req.params.id;
		produtosModel.atualizarProduto(dados, id).then(result => {
			res.redirect("/produtos")
		}).catch(error => console.log(error))

	}else {
		res.render("login/login", {validacao : {}});	
	}
}


exports.detalhar = (application, req, res)=>{
	if(req.session.autorizado){
		const colaborador = req.session.colaborador
		const connection = application.config.dbConnection();
		const produtosModel = new application.app.models.ProdutosDao(connection);
		const id  = req.params.id
		produtosModel.dadosProduto(id).then(result => {
			res.render("produtos/detalhes", {
				dados    : result,
				colaboradores : colaborador
			})
		}).catch(error => console.log(error))

	}else {
		res.render("login/login", {validacao : {}});	
	}
}

exports.listar = (application, req, res)=>{
	if(req.session.autorizado){
		const colaborador = req.session.colaborador
		const connection = application.config.dbConnection();
		const produtosModel = new application.app.models.ProdutosDao(connection);
		produtosModel.listarProduto().then(result => {
			res.render("produtos/produtos", {
				produtos : result,
				colaboradores : colaborador
			});
		}).catch(error => console.log(error))
	}else {
		res.render("login/login", {validacao : {}});	
	}
}


exports.categoriaForm = (application, req, res)=>{
	if(req.session.autorizado){
		const colaborador = req.session.colaborador
		res.render('produtos/categoria', {
			validacao : {},
			colaboradores  : colaborador,
		});
	} else {
		res.render("login/login", {validacao : {}});	
	}
}


exports.categoriaSalvar = (application, req, res)=>{
	if(req.session.autorizado){
		const colaborador = req.session.colaborador
		const dados = req.body;
		req.assert('categoria','Campo categoria do produto é obrigatório').notEmpty();
		const erros = req.validationErrors();
		
		if(erros){
			res.render('produtos/categoria', {
				validacao : erros,
				colaboradores  : colaborador,
			});
		}

		const connection = application.config.dbConnection();
		const produtosModel = new application.app.models.ProdutosDao(connection);
		produtosModel.cadastrarCategoria(dados).then(result=>
			res.redirect('/produto/categoria')
		).catch(error => {
			res.send(error)
		})
			
	} else {
		res.render("login/login", {validacao : {}});	
	}
}
/*
exports.descontoForm = (application, req, res)=>{
	if(req.session.autorizado){
		const colaborador = req.session.colaborador
		const connection = application.config.dbConnection();
		const produtosModel = new application.app.models.ProdutosDao(connection);
		produtosModel.listarProduto().then(result => {
			res.render('produtos/desconto', {
				validacao : {},
				colaboradores  : colaborador,
				dados : result
			});
		}).catch(error => console.log(error))
	} else {
		res.render("login/login", {validacao : {}});	
	}
}


exports.descontoSalvar = (application, req, res)=>{
	if(req.session.autorizado){
		const colaborador = req.session.colaborador
		const dadosForm = req.body;
		console.log(dadosForm)
		req.assert('idProduto','Campo produto é obrigatório').notEmpty();
		req.assert('valor','Campo valor do produto é obrigatório').notEmpty();
		req.assert('valor','Campo valor do produto é numérico').isFloat();
		const erros = req.validationErrors();
		const connection = application.config.dbConnection();
		if(erros){
			const produtosModel = new application.app.models.ProdutosDao(connection);
			produtosModel.listarProduto().then(result => {
				res.render('produtos/desconto', {
					validacao : erros,
					colaboradores  : colaborador,
					dados : result
				});
			}).catch(error => console.log(error))
		}

		const produtosModel = new application.app.models.ProdutosDao(connection);
		produtosModel.cadastrarDesconto(dadosForm).then(result =>
			res.redirect('/produto/desconto')
		).catch(error => {
			res.send(error)
		})
			
	} else {
		res.render("login/login", {validacao : {}});	
	}
}

exports.descontos = (application, req, res)=>{
	if(req.session.autorizado){
		const colaborador = req.session.colaborador
		const connection = application.config.dbConnection();
		const produtosModel = new application.app.models.ProdutosDao(connection);
		produtosModel.listarDesconto().then(result => {
			res.render("produtos/descontos", {
				dados : result,
				colaboradores : colaborador
			});
		}).catch(error => console.log(error))
	}else {
		res.render("login/login", {validacao : {}});	
	}
}
*/