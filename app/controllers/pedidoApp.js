exports.pedidos_app = (application, req, res)=>{
	const connection = application.config.dbConnection();
	const pedidoModel = new application.app.models.PedidoAppDAO(connection);
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
	const pedidoModel = new application.app.models.PedidoAppDAO(connection);
	pedidoModel.statusCompraApp(dados, id).then(results => {
		res.redirect('/pedidosApp')
	}).catch(erro => console.log(erro))	
}


exports.detalhesPedidoApp = (application, req, res)=>{
	var dados = req.body
	var id = req.params.id
	const connection = application.config.dbConnection();
	const pedidoModel = new application.app.models.PedidoAppDAO(connection);
	pedidoModel.detalhesPedidoApp(id).then(results => {
		res.render('pedido/detalhesPedidosApp',{
			dados : results,
			autenticar : {
				colaborador : req.session.colaborador,
				tipo : req.session.tipo
			},
		})
	}).catch(erro => console.log(erro))	
}