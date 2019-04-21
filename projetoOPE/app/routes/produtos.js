
module.exports = (application)=>{

    application.get('/produto/cadastrar',(req, res)=>{
      application.app.controllers.produtos.cadastrar(application, req, res);		
  });

   application.post('/produto',(req, res)=>{
      application.app.controllers.produtos.salvar(application, req, res);		
  }); 
  
  application.get('/produto/excluir/:id',(req, res)=>{
      application.app.controllers.produtos.excluir(application, req, res);		
  });

  application.get('/produto/editar/:id', (req, res)=>{
      application.app.controllers.produtos.editar(application, req, res);		
  });

  application.post('/produto/salvar/:id', (req, res)=>{
      application.app.controllers.produtos.atualizar(application, req, res);		
  });

  application.get('/produto/detalhes/:id', (req, res)=>{
      application.app.controllers.produtos.detalhar(application, req, res);		
  });

  application.get('/produtos', (req, res)=>{
      application.app.controllers.produtos.listar(application, req, res);		
  });
  /*
  application.get('/produto/desconto', (req, res)=>{
    application.app.controllers.produtos.descontoForm(application, req, res);		
  });

  application.post('/produto/desconto', (req, res)=>{
    application.app.controllers.produtos.descontoSalvar(application, req, res);		
  });

  application.get('/produto/descontos', (req, res)=>{
    application.app.controllers.produtos.descontos(application, req, res);		
  });
  */
  application.get('/produto/categoria', (req, res)=>{
    application.app.controllers.produtos.categoriaForm(application, req, res);		
  });

  application.post('/produto/categoria', (req, res)=>{
    application.app.controllers.produtos.categoriaSalvar(application, req, res);		
  });
}