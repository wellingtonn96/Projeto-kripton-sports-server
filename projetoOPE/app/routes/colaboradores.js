
module.exports = (application)=>{
 	application.get('/colaboradores/cadastrar',(req, res)=>{
		application.app.controllers.colaboradores.cadastrar(application, req, res);		
	});
	application.post('/colaboradores/salvar',(req, res)=>{
		application.app.controllers.colaboradores.colaborador_salvar(application, req, res);		
	}); 
	application.get('/colaboradores/excluir/:id', (req, res)=>{
		application.app.controllers.colaboradores.excluirColaborador(application, req, res);		
	});
	application.get('/colaboradores/editar/:id', (req, res)=>{
		application.app.controllers.colaboradores.editarColaborador(application, req, res);		
	});
	application.post('/colaboradores/salvar/:id', (req, res)=>{
		application.app.controllers.colaboradores.salvarColaborador(application, req, res);		
	});
	application.get('/colaboradores/detalhes/:id',(req, res)=>{
		application.app.controllers.colaboradores.detalhesColaborador(application, req, res);		
	});

	application.get('/colaboradores',(req, res)=>{
		application.app.controllers.colaboradores.colaboradores(application, req, res);		
	});
	application.get('/colaboradores/nutricionista',(req, res)=>{
		application.app.controllers.colaboradores.cadastrarNutricionista(application, req, res);		
	});

	application.post('/colaboradores/nutricionista',(req, res)=>{
		application.app.controllers.colaboradores.nutricionistaSalvar(application, req, res);		
	});
	
}