module.exports = (application)=>{
	application.get('/inicio', (req, res)=>{
		application.app.controllers.home.index(application, req, res);
	});
};

