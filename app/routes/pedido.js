
module.exports = (application)=>{

    application.get('/pedido_add',(req, res)=>{
       if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
        application.app.controllers.pedido.pedidoAdd(application, req, res);		
      }else {
          res.render("login/login", {validacao : {}});	
      }
    });

    application.post('/pedido_add',(req, res)=>{
      if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
        application.app.controllers.pedido.pedidoAdd_salvar(application, req, res);		
      }else {
          res.render("login/login", {validacao : {}});	
      }
    });

    application.get('/pedido',(req, res)=>{
       if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
        application.app.controllers.pedido.criarPedido(application, req, res);		
      }else {
          res.render("login/login", {validacao : {}});	
      }
    });

    application.post('/pedido',(req, res)=>{
     if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
        application.app.controllers.pedido.criarPedido_salvar(application, req, res);		
      }else {
          res.render("login/login", {validacao : {}});	
      }
    });

    application.post('/pedido_finalizar/:id',(req, res)=>{
      if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
        application.app.controllers.pedido.subtotal(application, req, res);		
      }else {
          res.render("login/login", {validacao : {}});	
      }
    });

    application.get('/pedidosApp',(req, res)=>{
      if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
        application.app.controllers.pedido.pedidos_app(application, req, res);		
      }else {
          res.render("login/login", {validacao : {}});	
      }
    });

    application.post('/pedidosApp/:id',(req, res)=>{
      if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
        application.app.controllers.pedido.statusCompraApp(application, req, res);		
      }else {
          res.render("login/login", {validacao : {}});	
      }
    });

}