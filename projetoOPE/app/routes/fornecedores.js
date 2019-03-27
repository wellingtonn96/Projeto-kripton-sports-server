module.exports = (application)=>{

application.get('/fornecedor/cadastrar',(req, res)=>{
      application.app.controllers.fornecedores.cadastrar(application, req, res);		
  });

   application.post('/fornecedor', (req, res)=>{
      application.app.controllers.fornecedores.salvar(application, req, res);		
  }); 
  
  application.get('/fornecedor/excluir/:id',(req, res)=>{
      application.app.controllers.fornecedores.excluir(application, req, res);		
  });

  application.get('/fornecedor/editar/:id', (req, res)=>{
      application.app.controllers.fornecedores.editar(application, req, res);		
  });

  application.post('/fornecedor/salvar/:id',(req, res)=>{
      application.app.controllers.fornecedores.atualizar(application, req, res);		
  });

  application.get('/fornecedor/detalhes/:id', (req, res)=>{
      application.app.controllers.fornecedores.detalhar(application, req, res);		
  });

  application.get('/fornecedores', (req, res)=>{
      application.app.controllers.fornecedores.listar(application, req, res);		
  });
}
