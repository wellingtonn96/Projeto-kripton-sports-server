import app from './app';
let port = 3333

app.listen(port, () => {
	console.log(`servidor funcionando na porta => https://localhost: ${port}`);
});
