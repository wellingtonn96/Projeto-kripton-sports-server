import app from './app';

const port = 3333;

app.listen(port, () => {
  console.log(`servidor funcionando na porta => https://localhost: ${port}`);
});
