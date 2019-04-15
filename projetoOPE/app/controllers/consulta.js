exports.cadastrar = (application, req, res)=>{
	if(req.session.autorizado){
		const usuario = req.session.usuario
		const connection = application.config.dbConnection()
		const dadosModel = new application.app.models.ConsultaDao(connection)
		dadosModel.nutricionistas().then(nutricionistas => {
			dadosModel.clientes().then(clientes => {
				res.render("consulta/addConsulta", {
					validacao: {},
					usuarios : usuario,
					dadosNutricionista : nutricionistas,
					dadosCliente : clientes
				});
			}).catch(error => {
				console.log(error)
			})
		}).catch(error => {
			console.log(error)
		})
	} else {
		res.render("login/login", {
			validacao : {}
		});	
	}
}


exports.dadosConsulta = (application, req, res)=>{
	if(req.session.autorizado){
		const dados = req.body
		const connection = application.config.dbConnection()
		const dadosModel = new application.app.models.ConsultaDao(connection);
		dadosModel.agendaConsulta(dados).then(results =>
			res.redirect('/consulta/listar')
		).catch(error => console.log(error))
	} else {
		res.render("login/login", {
			validacao : {}
		});	
	}
}

exports.listarConsultas = (application, req, res)=>{
	if(req.session.autorizado){
		const usuario = req.session.usuario
		const connection = application.config.dbConnection()
		const dadosModel = new application.app.models.ConsultaDao(connection)
		dadosModel.consultasMarcadas().then(results=>{
			res.render("consulta/agendaConsulta", {
				usuarios : usuario,
				dados : results
			});
		}).catch(error => console.log(error))
	} else {
		res.render("login/login", {
			validacao : {}
		});	
	}
}

exports.cadastrarProntuario = (application, req, res)=>{
	if(req.session.autorizado){
		const usuario = req.session.usuario
		const connection = application.config.dbConnection()
		const dadosModel = new application.app.models.ConsultaDao(connection)
		dadosModel.nutricionistas().then(nutricionistas => {
			dadosModel.consultasMarcadas().then(consultas => {
				res.render("consulta/addProtuario", {
					validacao: {},
					usuarios : usuario,
					dadosNutricionista : nutricionistas,
					dadosConsulta : consultas
				});
			}).catch(error => {
				console.log(error)
			})
		}).catch(error => {
			console.log(error)
		})
	} else {
		res.render("login/login", {
			validacao : {}
		});	
	}
}