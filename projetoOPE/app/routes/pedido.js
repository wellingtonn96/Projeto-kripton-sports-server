
module.exports = (application)=>{

    application.get('/addpedido',(req, res)=>{
      application.app.controllers.pedido.addPedido(application, req, res);		
    });

    application.post('/addpedido',(req, res)=>{
      application.app.controllers.pedido.pedido(application, req, res);		
    });

    application.get('/pedido',(req, res)=>{
      application.app.controllers.pedido.criarPedido(application, req, res);		
    });

    application.post('/pedido',(req, res)=>{
      application.app.controllers.pedido.criarPedido_salvar(application, req, res);		
    });

}