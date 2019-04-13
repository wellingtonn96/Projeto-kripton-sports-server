exports.usuarios = (application, req, res)=>{
	if(req.session.autorizado){
		const usuario = req.session.usuario
		res.render("usuarios/usuarios", {
			usuarios : usuario
		});
	} else {
		res.render("login/login", {validacao : {}});	
	}
}


exports.usuarios = (application, req, res)=>{
	if(req.session.autorizado){
		const usuario = req.session.usuario
			const connection = application.config.dbConnection();
			const usuariosModel = new application.app.models.UsuariosDao(connection);

			usuariosModel.listarUsuarios().then(result => {
				res.render("usuarios/usuarios", {
					dados : result,
					usuarios : usuario
				})
			}).catch(error => {
				console.log(error)
			})

	}else {
		res.render("login/login", {validacao : {}});	
	}
}




exports.cadastrar = (application, req, res)=>{
	if(req.session.autorizado){
		const usuario = req.session.usuario
		res.render('usuarios/cadastrar', {
			validacao : {},
			usuarios : usuario,
			dados: {}
		});
	} else {
		res.render("login/login", {validacao : {}});	
	}
}



//create
exports.usuario_salvar = (application, req, res)=>{
	if(req.session.autorizado){
		const usuario = req.session.usuario
		const dadosForm = req.body;
		req.assert('login','Campo login é obrigatório').notEmpty();
		req.assert('login','Campo login é de 4 a 10 caracteres').len(4, 10);
		req.assert('senha','Campo senha é obrigatório').notEmpty();
		req.assert('email','Campo email é obrigatório').notEmpty();
		req.assert('nome','Campo nome é obrigatório').notEmpty();
		req.assert('telefone','Campo telefone é obrigatório').notEmpty();
		req.assert('idTipo','Campo tipo é obrigatório').notEmpty();
		const erros = req.validationErrors();
		
		if(erros){
			res.render('usuarios/cadastrar', {
				validacao : erros,
				usuarios : usuario,
				dados: dadosForm
			});
			return;
		}

		const connection = application.config.dbConnection();
		const usuariosModel = new application.app.models.UsuariosDao(connection);
		usuariosModel.cadastrarUsuario(dadosForm).then(result =>
			res.redirect('/usuarios')
		).catch(erros =>{
			console.log(erros)
		})
	
	} else {
		res.render("login/login", {validacao : {}});	
	}
}




//Update
exports.editarUsuario = (application, req, res)=>{
	if(req.session.autorizado){
		const usuario = req.session.usuario
		const connection = application.config.dbConnection();
		const usuariosModel = new application.app.models.UsuariosDao(connection);
		const id  = req.params.id;
		usuariosModel.dadosUsuario(id).then(result =>{
			res.render("usuarios/editar", {
				dados    : result,
				usuarios : usuario
			})
		}).catch(error =>
			console.log(error)
		)
		
	}else {
		res.render("login/login", {validacao : {}});	
	}
}





exports.salvarUsuario = (application, req, res)=>{
	if(req.session.autorizado){
		const usuario = req.session.usuario
		const connection = application.config.dbConnection();
		const usuariosModel = new application.app.models.UsuariosDao(connection);
		const dados = req.body
		const id  = req.params.id;
		usuariosModel.salvarUsuario(dados, id).then(result =>
			res.redirect("/usuarios")
		).catch(error =>
			console.log(error)
		)

	}else {
		res.render("login/login", {validacao : {}});	
	}
}



exports.detalhesUsuario = (application, req, res)=>{
	if(req.session.autorizado){
		const usuario = req.session.usuario
		const connection = application.config.dbConnection();
		const usuariosModel = new application.app.models.UsuariosDao(connection);
		const id  = req.params.id;
		usuariosModel.dadosUsuario(id).then(result =>
			res.render("usuarios/detalhes", {
				dados : result,
				usuarios : usuario
			})).catch(error => 
				console.log(error)
			)
	}else {
		res.render("login/login", {validacao : {}});	
	}
}



//Delete
exports.excluirUsuario = function(application, req, res){
	if(req.session.autorizado){
		const usuario = req.session.usuario
		const connection = application.config.dbConnection();
		const usuariosModel = new application.app.models.UsuariosDao(connection);
		const id  = req.params.id;
		usuariosModel.excluirUsuario(id).then(result =>
			res.redirect("/usuarios")
			)
			.catch(error => 
				console.log(error)
			)

	}else {
		res.render("login/login", {validacao : {}});	
	}
}




exports.cadastrarNutricionista = (application, req, res)=>{
	if(req.session.autorizado){
		const usuario = req.session.usuario
		res.render("usuarios/nutricionista", {
			validacao:{},
			usuarios : usuario
		});
	} else {
		res.render("login/login", {validacao : {}});	
	}
}


exports.nutricionistaSalvar = function(application, req, res){
	if(req.session.autorizado){
	const usuario = req.session.usuario
	const input = req.body
	req.assert('login','Campo login é obrigatório').notEmpty();
	req.assert('login','Campo login é de 4 a 10 caracteres').len(4, 10);
	req.assert('senha','Campo senha é obrigatório').notEmpty();
	req.assert('email','Campo email é obrigatório').notEmpty().isEmail();
	req.assert('nome','Campo nome é obrigatório').notEmpty();
	req.assert('telefone','Campo telefone é obrigatório').notEmpty();
	req.assert('crn','Campo CRN é obrigatório').notEmpty();
	var erros = req.validationErrors();
	if(erros){
		res.render('usuarios/nutricionista', {
			validacao : erros,
			usuarios : usuario
		});
		return;
	}

	var dados = {
		login : input.login,
		senha : input.senha,
		email : input.email,
		nome  : input.nome,
		telefone : input.telefone,
		idTipo : 4
	};

	const connection = application.config.dbConnection();
	const usuariosModel = new application.app.models.UsuariosDao(connection);
	usuariosModel.cadastrarUsuario(dados).then(usuario =>{
		var nutricionista = {
			crn : input.crn,
			idUsuario : usuario.insertId,
		}
		usuariosModel.cadastrarNutricionista(nutricionista).then(result =>{
			res.redirect('/usuarios')
			//res.send(result)
		}
		).catch(erros =>{
			console.log(erros)
		})
		}
		).catch(erros =>{
			console.log(erros)
		})

	} else {
		res.render("login/login", {validacao : {}});	
	}
}
