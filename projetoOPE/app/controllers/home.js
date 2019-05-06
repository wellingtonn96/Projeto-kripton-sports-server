exports.index = (application, req, res)=>{
	const colaborador = req.session.colaborador
	const connection = application.config.dbConnection();
	const produtosModel = new application.app.models.ProdutosDao(connection);
	produtosModel.listaVencimento().then(result => {
		res.render("home/index",{
			colaboradores : colaborador,
			dados: result
		});
	}).catch(error => console.log(error))
}
