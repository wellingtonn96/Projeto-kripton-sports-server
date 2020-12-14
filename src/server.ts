import app from './config/server';
let port = 3000

app.listen(port, () => {
	console.log(`servidor funcionando na porta => https://localhost: ${port}`);
});

/*
var http = require('http')
var socket = require('socket.io')

var http = http.Server(app)
var io = socket(http);

io.on('connection', function(socket){
	console.log('Usuário conectado');
	
	io.emit("alerta vecimento",{
		data: new Date()
	})
})
*/

	