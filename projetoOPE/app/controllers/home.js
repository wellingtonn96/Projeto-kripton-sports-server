exports.index = (application, req, res)=>{
	const connection = application.config.dbConnection();
	const produtosModel = new application.app.models.ProdutosDao(connection);
	const consultasModel = new application.app.models.ConsultaDao(connection)
	consultasModel.consultasMarcadas().then(consultas=>{
		produtosModel.listaVencimento().then(result => {
			res.render("home/index",{
				autenticar : {
					colaborador : req.session.colaborador,
					tipo : req.session.tipo
				},	
				dados: result,
				dadosConsulta : consultas
			});
		}).catch(error => console.log(error))
	}).catch(error => console.log(error))
}
