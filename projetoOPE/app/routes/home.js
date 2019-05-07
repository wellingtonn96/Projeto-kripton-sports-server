module.exports = (application)=>{
	application.get('/inicio', (req, res)=>{
		if(req.session.autorizado && req.session.tipo === 1  || req.session.tipo === 2 || req.session.tipo === 3){
			application.app.controllers.home.index(application, req, res);
		}else {
            res.render("login/login", {validacao : {}});	
        }
	});
};

