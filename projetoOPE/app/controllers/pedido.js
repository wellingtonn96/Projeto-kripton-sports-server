exports.addPedido = (application, req, res)=>{
	if(req.session.autorizado){
        const usuario = req.session.usuario
		const connection = application.config.dbConnection();
		const produtosModel = new application.app.models.ProdutosDao(connection);
		produtosModel.listarProduto().then(result => {
			res.render("pedido/addPedido",{
                usuarios: usuario,
                produtos: result
            });
		}).catch(error => console.log(error))
	} else {
		res.render("login/login", {
			validacao : erros,
		});
	}
}

exports.pedido = (application, req, res)=>{
	console.log(req.body)
}