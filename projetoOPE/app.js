let app = require('./config/server');
let port = 4000

app.listen(port,()=>{
	console.log("servidor funcionando na porta => https://localhost:"+port);
});
	