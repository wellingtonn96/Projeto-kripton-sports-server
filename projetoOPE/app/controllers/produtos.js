exports.cadastrar = (application, req, res)=>{
	

		const connection = application.config.dbConnection();
		const produtosModel = new application.app.models.ProdutosDao(connection);
		const fornecedorModel = new application.app.models.FornecedoresDao(connection)
		fornecedorModel.listarFornecedor().then(fornecedor => {
			produtosModel.listarCategoria().then(categoria => {
				res.render('produtos/cadastrar', {
					validacao : {},
					autenticar : {
						colaborador : req.session.colaborador,
						tipo : req.session.tipo
					},
					dadosFornecedor : fornecedor,
					dadosCategoria : categoria,
					dados : {}
				});
			}).catch(error => console.log(error))
		}).catch(error => console.log(error))
	
}




exports.salvar = (application, req, res)=>{
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
					autenticar : {
						colaborador : req.session.colaborador,
						tipo : req.session.tipo
					},
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
}





exports.excluir = (application, req, res)=>{
	const connection = application.config.dbConnection();
	const produtosModel = new application.app.models.ProdutosDao(connection);
	const id  = req.params.id;
	produtosModel.excluirProduto(id).then(result => 
		res.redirect("/produtos")
	).catch(error => console.log(error))
}




exports.editar = (application, req, res)=>{
	const connection = application.config.dbConnection();
	const produtosModel = new application.app.models.ProdutosDao(connection);
	const id  = req.params.id
	produtosModel.dadosProduto(id).then(result => {
		res.render("produtos/editar", {
			dados    : result,
			autenticar : {
				colaborador : req.session.colaborador,
				tipo : req.session.tipo
			},
		})
	}).catch(error => console.log(error))
}



exports.atualizar = (application, req, res)=>{
	const connection = application.config.dbConnection();
	const produtosModel = new application.app.models.ProdutosDao(connection);
	const dados = req.body
	const id  = req.params.id;
	produtosModel.atualizarProduto(dados, id).then(result => {
		res.redirect("/produtos")
	}).catch(error => console.log(error))
}


exports.detalhar = (application, req, res)=>{
	const connection = application.config.dbConnection();
	const produtosModel = new application.app.models.ProdutosDao(connection);
	const id  = req.params.id
	produtosModel.dadosProduto(id).then(result => {
		res.render("produtos/detalhes", {
			dados    : result,
			autenticar : {
				colaborador : req.session.colaborador,
				tipo : req.session.tipo
			},
		})
	}).catch(error => console.log(error))
}

exports.listar = (application, req, res)=>{
	const connection = application.config.dbConnection();
	const produtosModel = new application.app.models.ProdutosDao(connection);
	produtosModel.listarProduto().then(result => {
		res.render("produtos/produtos", {
			produtos : result,
			autenticar : {
				colaborador : req.session.colaborador,
				tipo : req.session.tipo
			},
		});
	}).catch(error => console.log(error))
}


exports.categoriaForm = (application, req, res)=>{
	res.render('produtos/categoria', {
		validacao : {},
		autenticar : {
			colaborador : req.session.colaborador,
			tipo : req.session.tipo
		},
	});
}


exports.categoriaSalvar = (application, req, res)=>{
	const dados = req.body;
	req.assert('categoria','Campo categoria do produto é obrigatório').notEmpty();
	const erros = req.validationErrors();
	
	if(erros){
		res.render('produtos/categoria', {
			validacao : erros,
			autenticar : {
				colaborador : req.session.colaborador,
				tipo : req.session.tipo
			},
		});
	}

	const connection = application.config.dbConnection();
	const produtosModel = new application.app.models.ProdutosDao(connection);
	produtosModel.cadastrarCategoria(dados).then(result=>
		res.redirect('/produto/categoria')
	).catch(error => {
		res.send(error)
	})
}

exports.estoqueProdutos = (application, req, res)=>{
	const connection = application.config.dbConnection();
	const produtosModel = new application.app.models.ProdutosDao(connection);
	produtosModel.listarProduto().then(result => {
		res.render("produtos/estoque", {
			produtos : result,
			autenticar : {
				colaborador : req.session.colaborador,
				tipo : req.session.tipo
			},
		});
	}).catch(error => console.log(error))
}

exports.atualizarEstoque = (application, req, res)=>{
	var id = req.params.id
	var dados = req.body
	const connection = application.config.dbConnection();
	const produtosModel = new application.app.models.ProdutosDao(connection);
	produtosModel.atualizarProduto(dados, id).then(result => {
		res.redirect('/estoque')
	}).catch(error => console.log(error))
}