
--create database projetoOPE; 
create database ope2019
use ope2019


create table login(
	usuario varchar(50) null,
	senha int null
);

-- criando a tabela Tipo de usuario (cliente, vendedor, gerente, nutricionista)
create table tipoUsuario( 
	idTipoUsuario int not null auto_increment,
	tipo varchar(50),
    primary key(idTipoUsuario)
);

-- Um  usuário  pode ser um gerente, vendedor, colaborador ou até mesmo um cliente what ever
create table usuario(
	idUsuario int not null auto_increment,
    login varchar(10) not null,
	senha varchar(40) not null,     
	email varchar(50),
	nome varchar(60) not null,
	telefone varchar(11) not null, 
    idTipo int not null,
	primary key(idUsuario),
    constraint fk_idTipo foreign key(idTipo) references tipoUsuario(idTipoUsuario)
);

-- Criando a tabela endereço

create table endereco(
	idEndereco int not null auto_increment,
	rua varchar(50),
    cidade varchar(50),
    numero varchar(150),
    estado char(2),
    idUsuario int not null,
    primary key (idEndereco),
    constraint fk_idUsuario foreign key(idUsuario) references usuario(idUsuario)
);

create table nutricionista(
	idNutricionista smallint not null auto_increment,
	crn smallint not null,
    idUsuario int not null,
	primary key(idNutricionista),
    constraint fk_idNutricionista foreign key(idUsuario) references usuario(idUsuario)
);

-- Um vendedor pode agendar a consulta para o cliente, o id usuario será o id do cliente

create table agendaConsulta(
	idConsulta int not null auto_increment,
	dataConsulta datetime,
	descricao varchar(300),
	idNutricionista smallint,
	idCliente int not null,
	primary key(idConsulta),
	constraint fk_idNutricionistaConsulta foreign key(idNutricionista) references nutricionista(idNutricionista),
    constraint fk_idClienteConsulta foreign key(idCliente) references usuario(idUsuario)
);

-- Criando a tabela Prontuario
create table prontuarioConsulta(
	idProntuario smallint not null auto_increment,
	idConsulta int not null,
	diagnostico varchar(1000),
	idNutricionista smallint not null,
	primary key(idProntuario),
	foreign key(idNutricionista) references nutricionista(idNutricionista),
	foreign key(idConsulta) references agendaConsulta(idConsulta)
);

-- Criando a tabela fornecedores
create table fornecedor(
	idFornecedor int not null auto_increment,
	cnpj varchar(14) not null,
	-- razaoSocial varchar(100) not null,
	email varchar(60) not null,
	endereco varchar(60) not null,
	telefone varchar(20) not null,
	primary key(idFornecedor)
);


-- Modelando Produto
-- Criando a tabela categoria produto que será refecenciada na tabela produto
-- Uma categoria de produto pode ser  Whey, massa etc...

create table categoriaProduto(
	idCategoria int not null auto_increment,
    categoria varchar(60),
    primary key(idCategoria)
);

create table produto(
	idProduto smallint not null auto_increment,
	idCategoria int not null,
	codigo int not null,
    marca varchar(30),
    nome varchar(30),
    descricao varchar(300),                     
	validade date not null,
	lote int not null,
    statusProduto varchar(50), -- Disponivel indisponivel
	valor decimal(4,2),
	idFornecedor int not null,
	primary key(idProduto),
	foreign key(idFornecedor) references fornecedor(idFornecedor),
    foreign key(idCategoria) references categoriaProduto(idCategoria)
);

create table pedido(
	idPedido int not null,
	dataPedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	idProduto smallint,
	idCliente int not null,
	idVendedor int not null,
	primary key (idPedido),
	foreign key(idProduto) references produto(idProduto),
	foreign key(idCliente) references usuario(idUsuario),
	foreign key(idVendedor) references usuario(idUsuario)
);
    

create table desconto(
	idDesconto smallint not null auto_increment,
    idProduto smallint,
    valor decimal(4,2),
    primary key (idDesconto),
    constraint fk_idProduto foreign key(idProduto) references produto(idProduto)
    );
    
create table notaFiscal(
	idNota smallint not null auto_increment,
    cpf int not null,
    idPedido int not null,
    primary key(idNota),
    constraint fk_idPedido foreign key(idPedido) references pedido(idPedido)
    );
    
    
insert into tipoUsuario(tipo) values("gerente"),("cliente"),("vendedor");


insert into usuario(login,senha,email,nome,telefone,idTipo) values("admin","admin","admin@gmail.com","admin","114444",1),("teste","teste","tete@gmail.com","teste","114444",1);

