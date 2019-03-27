module.exports = (application)=>{
    application.get('/consulta/agendar',(req, res)=>{
        application.app.controllers.consulta.cadastrar(application, req, res);		
    });
}
