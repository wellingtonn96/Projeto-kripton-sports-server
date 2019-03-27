let app = require('./config/server');
let port = 8000

app.listen(port, function(){
	var dtNow = new Date;
	console.log('------------------------------------------------');
	console.log('    Servidor rodando na porta '+port+': '+dtNow.getHours() + ":" + dtNow.getMinutes() + ":" + dtNow.getSeconds());
	console.log('------------------------------------------------');
});
