exports.index = (application, req, res)=>{
	const connection = application.config.dbConnection();
	const produtosModel = new application.app.models.ProdutosDao(connection);
	produtosModel.listaVencimento().then(result => {
		res.render("home/index",{
			autenticar : {
				colaborador : req.session.colaborador,
				tipo : req.session.tipo
			},	
			dados: result,
		});
	}).catch(error => console.log(error))
}