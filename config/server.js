const express = require('express');
const path = require('path');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session')
//const RedisStore = require('connect-redis')(session);

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
//express.static(root, [options])

app.use('/', express.static('./app/public'));


//colaboradores
app.use(express.static(path.join(__dirname, './app/public')));
app.use('/colaboradores', express.static('./app/public'));
app.use('/colaboradores/editar', express.static('./app/public'));
app.use('/colaboradores/detalhes', express.static('./app/public'));
app.use('/colaboradores/salvar', express.static('./app/public'))

//pedidosApp
app.use('/pedidosApp/:id', express.static('./app/public'))

app.use('/clientes/cadastrar', express.static('./app/public'))
app.use('/clientes/salvar', express.static('./app/public'))
app.use('/clientes/editar', express.static('./app/public'));
app.use('/clientes/detalhes', express.static('./app/public'));
app.use('/clientes/salvar', express.static('./app/public'))

//produtos
app.use('/produto' ,express.static('./app/public'));
app.use('/produto/editar', express.static('./app/public'));
app.use('/produto/detalhes', express.static('./app/public'));
app.use('/produto/salvar', express.static('./app/public'))

//fornecedor
app.use('/fornecedores/' ,express.static('./app/public'));
app.use('/fornecedor/cadastrar', express.static('./app/public'));
app.use('/fornecedor/editar', express.static('./app/public'));
app.use('/fornecedor/detalhes', express.static('./app/public'));
app.use('/fornecedor/salvar', express.static('./app/public'))

//nutricionista
app.use('/nutricionista' ,express.static('./app/public'));
app.use('/nutricionista/editar', express.static('./app/public'));
app.use('/nutricionista/detalhes', express.static('./app/public'));
app.use('/nutricionista/salvar', express.static('./app/public'));

//consulta
app.use('/consulta/agendar', express.static('./app/public'));
app.use('/consulta/listar', express.static('./app/public'));
app.use('/consulta/prontuario', express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* configurar o middleware express-validator */
app.use(expressValidator());

//configura o midware express-session
app.use(session({/*
    store: new RedisStore({
        host:'localhost',
        port:6379
    }),*/
    secret:'p@ssw0rd',
    resave:false,
    saveUninitialized:false
}))




consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .then('app/controllers')
    .into(app);

module.exports = app;