
exports.criarPedido = (application, req, res)=>{
	const connection = application.config.dbConnection();
	const clientesModel = new application.app.models.ClienteDao(connection);
	clientesModel.clientes().then(result => {
		res.render("pedido/addPedido",{
			dadosCliente: result,
			validacao : {},
			autenticar : {
				colaborador : req.session.colaborador,
				tipo : req.session.tipo
			},
			produtos: {},
			produto : {},
			idPedido: {},
		});
	}).catch(error => console.log(error))
}


exports.criarPedido_salvar = (application, req, res)=>{
	var dados = {
		idCliente : req.body.idCliente,
		idColaborador : req.session.idColaborador
	}
	const connection = application.config.dbConnection();
	const pedidoModel = new application.app.models.PedidoDao(connection);
	const produtosModel = new application.app.models.ProdutosDao(connection);
	pedidoModel.criarPedido(dados).then(dados => {
		const id = dados.insertId
		produtosModel.listarProduto().then(result => {
			res.render("pedido/addPedido",{
				dadosCliente: {},
				validacao : {},
				autenticar : {
					colaborador : req.session.colaborador,
					tipo : req.session.tipo
				},
				produtos: result,
				produto : {},
				idPedido:  id
			});
		}).catch(error => console.log(error));
	}).catch(erro => console.log(erro))
}


exports.pedidoAdd_salvar = (application, req, res)=>{
	var dados = req.body
	const connection = application.config.dbConnection();
	const pedidoModel = new application.app.models.PedidoDao(connection);
	const produtosModel = new application.app.models.ProdutosDao(connection);
	pedidoModel.inserirItemPedido(dados).then(results => {
		pedidoModel.itemsPedido(dados.idPedido).then(itemsPedido => {
		var valor = itemsPedido.map(item => item.soma).reduce((prev, next)=>prev + next);
			itemsPedido.total = valor.toFixed(2)
			produtosModel.listarProduto().then(result => {
				res.render("pedido/addPedido",{
					dadosCliente: {},
					validacao : {},
					autenticar : {
						colaborador : req.session.colaborador,
						tipo : req.session.tipo
					},
					produtos: result,
					produto :itemsPedido,
					idPedido: dados.idPedido
				});
			}).catch(error => console.log(error));
		}).catch(erro => console.log(erro))
	}).catch(erro => console.log(erro))
}

exports.subtotal = (application, req, res)=>{
	var dados = req.body
	var id = req.params.id
	const connection = application.config.dbConnection();
	const pedidoModel = new application.app.models.PedidoDao(connection);
	pedidoModel.insertFormaPgto(dados, id).then(results => {
		res.redirect('/pedido')
	}).catch(erro => console.log(erro))	
}

exports.pedidos_app = (application, req, res)=>{
	const connection = application.config.dbConnection();
	const pedidoModel = new application.app.models.PedidoDao(connection);
	pedidoModel.pedidos_app().then(results => {
		res.render("pedido/pedidosApp",{
			autenticar : {
				colaborador : req.session.colaborador,
				tipo : req.session.tipo
			},
			dados: results
		});
	}).catch(erro => console.log(erro))	
}

exports.statusCompraApp = (application, req, res)=>{
	var dados = req.body
	var id = req.params.id
	const connection = application.config.dbConnection();
	const pedidoModel = new application.app.models.PedidoDao(connection);
	pedidoModel.statusCompraApp(dados, id).then(results => {
		res.redirect('/pedidosApp')
	}).catch(erro => console.log(erro))	
}
