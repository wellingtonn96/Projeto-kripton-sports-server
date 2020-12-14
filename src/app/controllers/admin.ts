exports.logout = (application, req, res)=>{
	req.session.destroy(function(err){
		res.render("login/login", {
			validacao : {},
		});
	})
}


exports.login = (application, req, res)=>{
	res.render("login/login", {
		validacao : {},
	});
}


exports.autenticar = (application, req, res)=>{
	const dadosForm = req.body;
	req.assert('login','Campo login é obrigatório').notEmpty();
	req.assert('senha','Campo senha é obrigatório').notEmpty();
	const erros = req.validationErrors();
	if(erros){
		res.render("login/login", {
			validacao : erros,
		});
		return;
	}
	const connection = application.config.dbConnection();
	const colaboradoresModel = new application.app.models.ColaboradoresDao(connection);
	colaboradoresModel.autenticar(dadosForm, req, res).then((results) => {
		var row =  results[0]
			if(row != undefined){
				//console.log(row)
				req.session.autorizado = true;
				req.session.colaborador = row.nome;
				req.session.tipo = row.idTipo
				req.session.idColaborador = row.idColaborador
			}
			if(req.session.autorizado && req.session.tipo === 1 || 2 || 4){
				res.redirect("/inicio");
		}
	}).catch((err) => {
		var erro = [{
			msg: err
		}]
		res.render("login/login", {
			validacao : erro,
		});
	});
}