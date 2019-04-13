
module.exports = (application)=>{

    application.get('/pedido',(req, res)=>{
      application.app.controllers.pedido.addPedido(application, req, res);		
    });

    application.post('/pedido',(req, res)=>{
      application.app.controllers.pedido.pedido(application, req, res);		
    });

}