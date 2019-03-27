exports.cadastrar = (application, req, res)=>{
	if(req.session.autorizado){
		const usuario = req.session.usuario
		res.render("consulta/addConsulta", {
			validacao: {},
			usuarios : usuario
		});
	} else {
		res.render("login/login", {
			validacao : {}
		});	
	}
}