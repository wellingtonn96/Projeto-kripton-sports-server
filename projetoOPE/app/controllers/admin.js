exports.index = (application, req, res)=>{
	if(req.session.autorizado){
		const usuario = req.session.usuario
		res.render("home/index",{
			usuarios: usuario
		});
	} else {
		res.render("login/login", {
			validacao : erros,
		});
	}
}

exports.logout = (application, req, res)=>{
	/*delete req.session.autorizado
	res.render("login/login", {
		validacao : {},
	});*/
	
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
	const usuariosModel = new application.app.models.UsuariosDao(connection);
	usuariosModel.autenticar(dadosForm, req, res).then((results) => {
		var row =  results[0]
			if(row != undefined){
				req.session.autorizado = true;
				req.session.usuario = row.nome;
				req.session.tipo = row.idTipo
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