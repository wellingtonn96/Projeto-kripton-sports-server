
module.exports = (application)=>{

    application.get('/produto/cadastrar',(req, res)=>{
      if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
            application.app.controllers.produtos.cadastrar(application, req, res);
          }else {
            res.render("login/login", {validacao : {}});	
        }            		
    });

   application.post('/produto',(req, res)=>{
     if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
        application.app.controllers.produtos.salvar(application, req, res);
      }else {
        res.render("login/login", {validacao : {}});	
    }
    }); 
  
  application.get('/produto/excluir/:id',(req, res)=>{
     if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
          application.app.controllers.produtos.excluir(application, req, res);
        }else {
          res.render("login/login", {validacao : {}});	
      }
    });

  application.get('/produto/editar/:id', (req, res)=>{
     if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
          application.app.controllers.produtos.editar(application, req, res);
        }else {
          res.render("login/login", {validacao : {}});	
      }
    });

  application.post('/produto/salvar/:id', (req, res)=>{
     if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
          application.app.controllers.produtos.atualizar(application, req, res);
        }else {
          res.render("login/login", {validacao : {}});	
      }
    });

  application.get('/produto/detalhes/:id', (req, res)=>{
     if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
          application.app.controllers.produtos.detalhar(application, req, res);
        }else {
          res.render("login/login", {validacao : {}});	
      }
    });

  application.get('/produtos', (req, res)=>{
     if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
          application.app.controllers.produtos.listar(application, req, res);
        }else {
          res.render("login/login", {validacao : {}});	
      }
    });

  application.get('/produto/categoria', (req, res)=>{
    if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
          application.app.controllers.produtos.categoriaForm(application, req, res);
        }else {
          res.render("login/login", {validacao : {}});	
      }
    });

  application.post('/produto/categoria', (req, res)=>{
    if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
          application.app.controllers.produtos.categoriaSalvar(application, req, res);
        }else {
          res.render("login/login", {validacao : {}});	
      }
    });

    application.get('/estoque', (req, res)=>{
      if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
            application.app.controllers.produtos.estoqueProdutos(application, req, res);
          }else {
            res.render("login/login", {validacao : {}});	
        }
      });

      application.post('/estoque/:id', (req, res)=>{
        if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
              application.app.controllers.produtos.atualizarEstoque(application, req, res);
            }else {
              res.render("login/login", {validacao : {}});	
          }
        });
}