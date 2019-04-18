exports.addPedido = (application, req, res)=>{
	if(req.session.autorizado){
        const usuario = req.session.usuario
		const connection = application.config.dbConnection();
		const produtosModel = new application.app.models.ProdutosDao(connection);
		produtosModel.listarProduto().then(result => {
			res.render("pedido/addPedido",{
                usuarios: usuario,
				produtos: result,
				produto : {}
            });
		}).catch(error => console.log(error))
	} else {
		res.render("login/login", {
			validacao : erros,
		});
	}
}

exports.pedido = (application, req, res)=>{
	if(req.session.autorizado){
		const usuario = req.session.usuario
		const connection = application.config.dbConnection();
		const produtosModel = new application.app.models.ProdutosDao(connection);
		const id  = req.body.idProduto
		produtosModel.listarProduto().then(result => {
			produtosModel.dadosProduto(id).then(produto=>{
				const array = []
				array.push(produto[0])
				res.render("pedido/addPedido",{
					usuarios: usuario,
					produtos: result,
					produto : array
				});
			}).catch(error => console.log(error))			
		}).catch(error => console.log(error))

	}else {
		res.render("login/login", {validacao : {}});	
	}
	
}