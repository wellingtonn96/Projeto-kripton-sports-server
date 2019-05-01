
module.exports = (application)=>{

    application.get('/pedido_add',(req, res)=>{
      application.app.controllers.pedido.pedidoAdd(application, req, res);		
    });

    application.post('/pedido_add',(req, res)=>{
      application.app.controllers.pedido.pedidoAdd_salvar(application, req, res);		
    });

    application.get('/pedido',(req, res)=>{
      application.app.controllers.pedido.criarPedido(application, req, res);		
    });

    application.post('/pedido',(req, res)=>{
      application.app.controllers.pedido.criarPedido_salvar(application, req, res);		
    });

}