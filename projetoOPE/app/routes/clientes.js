
module.exports = (application)=>{
 	application.get('/clientes/cadastrar',(req, res)=>{
		application.app.controllers.clientes.cadastrar(application, req, res);		
	});
	application.post('/clientes/salvar',(req, res)=>{
		application.app.controllers.clientes.cliente_salvar(application, req, res);		
	}); 
	application.get('/clientes/excluir/:id', (req, res)=>{
		application.app.controllers.clientes.excluirCliente(application, req, res);		
	});
	application.get('/clientes/editar/:id', (req, res)=>{
		application.app.controllers.clientes.editarCliente(application, req, res);		
	});
	application.post('/clientes/salvar/:id', (req, res)=>{
		application.app.controllers.clientes.salvarCliente(application, req, res);		
	});
	application.get('/clientes/detalhes/:id',(req, res)=>{
		application.app.controllers.clientes.detalhesCliente(application, req, res);		
	});

	application.get('/clientes',(req, res)=>{
		application.app.controllers.clientes.clientes(application, req, res);		
	});
	
}