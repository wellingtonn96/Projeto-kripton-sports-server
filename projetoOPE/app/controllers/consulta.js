exports.cadastrar = (application, req, res)=>{
	const connection = application.config.dbConnection()
	const dadosNutricionistaModel = new application.app.models.ConsultaDao(connection)
	const dadosClienteModel = new application.app.models.ClienteDao(connection)
	dadosNutricionistaModel.nutricionistas().then(nutricionistas => {
		dadosClienteModel.clientes().then(clientes => {
			res.render("consulta/addConsulta", {
				validacao: {},
				autenticar : {
					colaborador : req.session.colaborador,
					tipo : req.session.tipo
				},
				dadosNutricionista : nutricionistas,
				dadosCliente : clientes
			});
		}).catch(error => {
			console.log(error)
		})
	}).catch(error => {
		console.log(error)
	})
}


exports.dadosConsulta = (application, req, res)=>{
	const dados = req.body
	const connection = application.config.dbConnection()
	const dadosModel = new application.app.models.ConsultaDao(connection);
	dadosModel.agendaConsulta(dados).then(results => {
		var prontuario = {
			idConsulta : results.insertId,
			idCliente : dados.idCliente,
			idNutricionista : dados.idNutricionista
		}
		dadosModel.inserirProntuario(prontuario).then(prontuario => 
			res.render("consulta/prontuario", {
				validacao: {},
				autenticar : {
					colaborador : req.session.colaborador,
					tipo : req.session.tipo,
				},
				idConsulta : results.insertId
			})
			).catch(error => console.log(error))
		}
	).catch(error => console.log(error))
}

exports.listarConsultas = (application, req, res)=>{
	const connection = application.config.dbConnection()
	const dadosModel = new application.app.models.ConsultaDao(connection)
	dadosModel.consultasMarcadas().then(results=>{
		res.render("consulta/agendaConsulta", {
			autenticar : {
				colaborador : req.session.colaborador,
				tipo : req.session.tipo
			},
			dados : results
		});
	}).catch(error => console.log(error))
}

exports.prontuario = (application, req, res)=>{
	const id = req.params.id
	const dados = req.body
	const connection = application.config.dbConnection()
	const dadosModel = new application.app.models.ConsultaDao(connection)
	dadosModel.cadastrarDiagnostico(dados, id).then(results=>{
		res.redirect('/consulta/listar')
	}).catch(error => console.log(error))
}

exports.dadosCliente = (application, req, res)=>{
	const id = req.params.id
	const connection = application.config.dbConnection()
	const dadosModel = new application.app.models.ConsultaDao(connection)
	dadosModel.dadosCliente(id).then(results=>{
		res.render("consulta/detalhes", {
			autenticar : {
				colaborador : req.session.colaborador,
				tipo : req.session.tipo
			},
			dados : results
		});
	}).catch(error => console.log(error))
}
