exports.index = (application, req, res)=>{
	if(req.session.autorizado){
		const usuario = req.session.usuario
		console.log(usuario)
		res.render("home/index",{
			usuarios: usuario
		});
	} else {
		res.render("login/login", {
			validacao : {}
		});	
	}
}

exports.logout = (application, req, res)=>{
	delete req.session.autorizado
	res.render("login/login", {
		validacao:{}
	})
	/*
	req.session.destroy(function(err){
		res.render("login/login", {validacao: {}});
	})
	*/
}

exports.login = (application, req, res)=>{
	res.render("login/login", {
		validacao:{}
	});
}


exports.autenticar = (application, req, res)=>{
	const dadosForm = req.body;
	req.assert('email','Campo e-mail é obrigatório').notEmpty();
	req.assert('senha','Campo senha é obrigatório').notEmpty();
	const erros = req.validationErrors();
	if(erros){
		res.render("login/login", {
			validacao : erros
		});
		return;
	}
	const connection = application.config.dbConnection();
	const usuariosModel = new application.app.models.UsuariosDao(connection);
	usuariosModel.autenticar(dadosForm, req, res)
}