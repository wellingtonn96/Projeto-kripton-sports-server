module.exports = (application)=>{

    application.get('/fornecedor/cadastrar',(req, res)=>{
        if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
            application.app.controllers.fornecedores.cadastrar(application, req, res);		
        }else {
            res.render("login/login", {validacao : {}});	
        }
    });

     application.post('/fornecedor', (req, res)=>{
        if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
            application.app.controllers.fornecedores.salvar(application, req, res);		
        }else {
            res.render("login/login", {validacao : {}});	
        }
    }); 
  
    application.get('/fornecedor/excluir/:id',(req, res)=>{
        if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
            application.app.controllers.fornecedores.excluir(application, req, res);		
        }else {
            res.render("login/login", {validacao : {}});	
        }
    });

    application.get('/fornecedor/editar/:id', (req, res)=>{
        if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
            application.app.controllers.fornecedores.editar(application, req, res);		
        }else {
            res.render("login/login", {validacao : {}});	
        }
    });

    application.post('/fornecedor/salvar/:id',(req, res)=>{
        if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
            application.app.controllers.fornecedores.atualizar(application, req, res);		
        }else {
            res.render("login/login", {validacao : {}});	
        }
    });

    application.get('/fornecedor/detalhes/:id', (req, res)=>{
        if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
            application.app.controllers.fornecedores.detalhar(application, req, res);		
        }else {
            res.render("login/login", {validacao : {}});	
        }
    });

    application.get('/fornecedores', (req, res)=>{
        if(req.session.autorizado && req.session.tipo == 1 || req.session.tipo === 2){ 
            application.app.controllers.fornecedores.listar(application, req, res);		
        }else {
            res.render("login/login", {validacao : {}});	
        }
    });
}
