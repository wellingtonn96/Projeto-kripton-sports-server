
module.exports = (application)=>{
	application.get('/colaboradores/cadastrar',(req, res)=>{
		if(req.session.autorizado && req.session.tipo === 1){
			application.app.controllers.colaboradores.cadastrar(application, req, res);		
		}else {
			res.render("login/login", {validacao : {}});	
		}
	});
	application.post('/colaboradores/salvar',(req, res)=>{
		if(req.session.autorizado && req.session.tipo === 1){
			application.app.controllers.colaboradores.colaborador_salvar(application, req, res);		
		}else {
			res.render("login/login", {validacao : {}});	
		}
	}); 
	application.get('/colaboradores/excluir/:id', (req, res)=>{
		if(req.session.autorizado && req.session.tipo === 1){
			application.app.controllers.colaboradores.excluirColaborador(application, req, res);		
		}else {
			res.render("login/login", {validacao : {}});	
		}
	});
	application.get('/colaboradores/editar/:id', (req, res)=>{
		if(req.session.autorizado && req.session.tipo === 1){
			application.app.controllers.colaboradores.editarColaborador(application, req, res);		
		}else {
			res.render("login/login", {validacao : {}});	
		}
	});
	application.post('/colaboradores/salvar/:id', (req, res)=>{
		if(req.session.autorizado && req.session.tipo === 1){
			application.app.controllers.colaboradores.salvarColaborador(application, req, res);		
		}else {
			res.render("login/login", {validacao : {}});	
		}
	});
	application.get('/colaboradores/detalhes/:id',(req, res)=>{
		if(req.session.autorizado && req.session.tipo === 1){
			application.app.controllers.colaboradores.detalhesColaborador(application, req, res);		
		}else {
			res.render("login/login", {validacao : {}});	
		}
	});

	application.get('/colaboradores',(req, res)=>{
		if(req.session.autorizado && req.session.tipo === 1){
			application.app.controllers.colaboradores.colaboradores(application, req, res);		
		}else {
			res.render("login/login", {validacao : {}});	
		}
	});
	application.get('/colaboradores/nutricionista',(req, res)=>{
		if(req.session.autorizado && req.session.tipo === 1){
			application.app.controllers.colaboradores.cadastrarNutricionista(application, req, res);		
		}else {
			res.render("login/login", {validacao : {}});	
		}
	});

	application.post('/colaboradores/nutricionista',(req, res)=>{
		if(req.session.autorizado && req.session.tipo === 1){
			application.app.controllers.colaboradores.nutricionistaSalvar(application, req, res);		
		}else {
			res.render("login/login", {validacao : {}});	
		}
	});
}