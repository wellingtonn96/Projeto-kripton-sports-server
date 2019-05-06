module.exports = (application)=>{
	application.get('/inicio', (req, res)=>{
		if(req.session.autorizado){
			application.app.controllers.home.index(application, req, res);
		}else {
            res.render("login/login", {validacao : {}});	
        }
	});
};

