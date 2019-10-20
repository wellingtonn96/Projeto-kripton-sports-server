module.exports = (application)=>{

    application.get('/consulta/agendar',(req, res)=>{
        if(req.session.autorizado && req.session.tipo === 3){
            application.app.controllers.consulta.cadastrar(application, req, res);		
        }else {
            res.render("login/login", {validacao : {}});	
        }
    });

    application.post('/consulta/agendar',(req, res)=>{
        if(req.session.autorizado && req.session.tipo === 3){
            application.app.controllers.consulta.dadosConsulta(application, req, res);
        }else {
            res.render("login/login", {validacao : {}});	
        }
    });

    application.post('/consulta/agendar/:id',(req, res)=>{
        if(req.session.autorizado && req.session.tipo === 3){
            application.app.controllers.consulta.prontuario(application, req, res);
        }else {
            res.render("login/login", {validacao : {}});	
        }
    });

    application.get('/consulta/listar', (req, res)=>{
        if(req.session.autorizado && req.session.tipo === 3){
            application.app.controllers.consulta.listarConsultas(application, req, res);
        }else {
            res.render("login/login", {validacao : {}});	
        }
     })

     application.get('/consulta/listar/:id', (req, res)=>{
        if(req.session.autorizado && req.session.tipo === 3){
            application.app.controllers.consulta.dadosCliente(application, req, res);
        }else {
            res.render("login/login", {validacao : {}});	
        }
     })

    application.get('/consulta/prontuario',(req, res)=>{
        if(req.session.autorizado && req.session.tipo === 3){
            application.app.controllers.consulta.cadastrarProntuario(application, req, res);		
        }else {
            res.render("login/login", {validacao : {}});	
        }
    });

    application.post('/consulta/prontuario', (req, res)=>{
        if(req.session.autorizado && req.session.tipo === 3){
            application.app.controllers.consulta.dadosProntuario(application, req, res);
        }else {
            res.render("login/login", {validacao : {}});	
        }
     })
     
}
