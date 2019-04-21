

exports.pedido = (application, req, res)=>{
	if(req.session.autorizado){
		const colaborador = req.session.colaborador
		const connection = application.config.dbConnection();
		const produtosModel = new application.app.models.ProdutosDao(connection);
		const id  = req.body.idProduto
		produtosModel.listarProduto().then(result => {
			produtosModel.dadosProduto(id).then(produto=>{
				const array = []
				array.push(produto[0])
				res.render("pedido/addPedido",{
					colaboradores: colaborador,
					produtos: result,
					produto : array
				});
			}).catch(error => console.log(error))			
		}).catch(error => console.log(error))

	}else {
		res.render("login/login", {validacao : {}});	
	}
	
}

exports.criarPedido = (application, req, res)=>{
	if(req.session.autorizado){
        const colaborador = req.session.colaborador
		const connection = application.config.dbConnection();
		const clientesModel = new application.app.models.ClienteDao(connection);
		clientesModel.clientes().then(result => {
			res.render("pedido/pedido",{
                colaboradores: colaborador,
				dadosCliente: result,
				validacao : {}
            });
		}).catch(error => console.log(error))
	} else {
		res.render("login/login", {
			validacao : erros,
		});
	}
}

exports.criarPedido_salvar = (application, req, res)=>{
	if(req.session.autorizado){
		var dados = {
			idCliente : req.body.idCliente,
			idColaborador : req.session.idColaborador
		}
		const connection = application.config.dbConnection();
		const pedidoModel = new application.app.models.PedidoDao(connection);
		pedidoModel.criarPedido(dados).then(result => {
			//res.redirect("/addpedido")
			const id = result.insertId
			pedido(application, req, res, id)
		}).catch(erro => console.log(erro))


	}else {
		res.render("login/login", {validacao : {}});	
	}
}




function pedido(application, req, res, idPedido){
	if(req.session.autorizado){
        const colaborador = req.session.colaborador
		const connection = application.config.dbConnection();
		const produtosModel = new application.app.models.ProdutosDao(connection);
		produtosModel.listarProduto().then(result => {
			res.render("pedido/addPedido",{
                colaboradores: colaborador,
				produtos: result,
				produto : {},
				idPedido : idPedido
            });
		}).catch(error => console.log(error))
	} else {
		res.render("login/login", {
			validacao : erros,
		});
	}
}