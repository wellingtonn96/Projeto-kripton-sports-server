module.exports = (application)=>{
	application.get('/', (req, res)=>{
		application.app.controllers.admin.login(application, req, res);		
	});

	application.post('/autenticar', (req, res)=>{
		application.app.controllers.admin.autenticar(application, req, res);		
	});

	application.get('/logout', (req, res)=>{
		application.app.controllers.admin.logout(application, req, res);
	});
};