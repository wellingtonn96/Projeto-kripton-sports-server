let app = require('./config/server');
let port = 8000

app.listen(port, function(){
	console.log("servidor funcionando na porta "+port);
});
