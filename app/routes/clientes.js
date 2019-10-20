
module.exports = (application)=>{
	
 	application.get('/clientes/cadastrar',(req, res)=>{
	 if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
			application.app.controllers.clientes.cadastrar(application, req, res);		
		}else {
			res.render("login/login", {validacao : {}});	
		}
	});
	application.post('/clientes/salvar',(req, res)=>{
	 if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
			application.app.controllers.clientes.cliente_salvar(application, req, res);		
		}else {
			res.render("login/login", {validacao : {}});	
		}
	}); 
	application.get('/clientes/excluir/:id', (req, res)=>{
	 if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
			application.app.controllers.clientes.excluirCliente(application, req, res);		
		}else {
			res.render("login/login", {validacao : {}});	
		}
	});
	application.get('/clientes/editar/:id', (req, res)=>{
	 if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
			application.app.controllers.clientes.editarCliente(application, req, res);		
		}else {
			res.render("login/login", {validacao : {}});	
		}
	});
	application.post('/clientes/salvar/:id', (req, res)=>{
	 if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
			application.app.controllers.clientes.salvarCliente(application, req, res);		
		}else {
			res.render("login/login", {validacao : {}});	
		}
	});
	application.get('/clientes/detalhes/:id',(req, res)=>{
	 if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
			application.app.controllers.clientes.detalhesCliente(application, req, res);		
		}else {
			res.render("login/login", {validacao : {}});	
		}
	});

	application.get('/clientes',(req, res)=>{
	 if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){
			application.app.controllers.clientes.clientes(application, req, res);		
		}else {
			res.render("login/login", {validacao : {}});	
		}
	});	
}