
module.exports = (application)=>{
 	application.get('/usuarios/cadastrar',(req, res)=>{
		application.app.controllers.usuarios.cadastrar(application, req, res);		
	});
	application.post('/usuarios/salvar',(req, res)=>{
		application.app.controllers.usuarios.usuario_salvar(application, req, res);		
	}); 
	application.get('/usuarios/excluir/:id', (req, res)=>{
		application.app.controllers.usuarios.excluirUsuario(application, req, res);		
	});
	application.get('/usuarios/editar/:id', (req, res)=>{
		application.app.controllers.usuarios.editarUsuario(application, req, res);		
	});
	application.post('/usuarios/salvar/:id', (req, res)=>{
		application.app.controllers.usuarios.salvarUsuario(application, req, res);		
	});
	application.get('/usuarios/detalhes/:id',(req, res)=>{
		application.app.controllers.usuarios.detalhesUsuario(application, req, res);		
	});

	application.get('/usuarios',(req, res)=>{
		application.app.controllers.usuarios.usuarios(application, req, res);		
	});
	application.get('/usuarios/nutricionista',(req, res)=>{
		application.app.controllers.usuarios.cadastrarNutricionista(application, req, res);		
	});

	application.post('/usuarios/nutricionista',(req, res)=>{
		application.app.controllers.usuarios.nutricionistaSalvar(application, req, res);		
	});
	
}