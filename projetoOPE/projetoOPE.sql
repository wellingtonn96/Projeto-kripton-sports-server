create database projetoOPE; 
use projetoOPE;

-- criando a tabela Tipo de Colaborador (cliente, vendedor, gerente, nutricionista)
create table tipoColaborador( 
	idTipoColaborador int not null auto_increment,
	tipo varchar(50),
    primary key(idTipoColaborador)
);

-- Um  usuário  pode ser um gerente, vendedor, colaborador, OBS. Adicionado Sobrenome
create table colaborador(
	idColaborador int not null auto_increment,
    login varchar(25) not null UNIQUE,
	senha varchar(100) not null,     
	email varchar(200),
	nome varchar(60) not null,
    sobrenome varchar(60) null default null,
	telefone varchar(11) not null, 
    idTipo int not null,
	primary key(idColaborador),
    constraint fk_idTipo foreign key(idTipo) references tipoColaborador(idTipoColaborador)
    ON DELETE CASCADE
	ON UPDATE CASCADE
);



-- Criando a tabela Cliente
create table cliente(
	idCliente int not null auto_increment,
    login varchar(25) not null,
	senha varchar(100) not null,     
	email varchar(200),
	nome varchar(60) not null,
    sobrenome varchar(60) null default null,
	telefone varchar(11) not null, 
	primary key(idCliente)
   );
    

-- Criando a tabela endereço

create table endereco(
	idEndereco int not null auto_increment,
	rua varchar(150),
    cidade varchar(100),
    numero varchar(100),
    estado char(2),
    idCliente int not null,
    primary key (idEndereco),
    constraint fk_idCliente foreign key(idCliente) references cliente(idCliente)
    ON DELETE CASCADE
	ON UPDATE CASCADE
);



-- O usuario nutricionista ja foi criado na tabela colaborador, porém ela possui essa tabela pois tem atributos especificos.
create table nutricionista(
	idNutricionista int not null auto_increment,
	crn int not null,
	idColaborador int not null,
	primary key(idNutricionista),
    constraint fk_idNutricionista foreign key(idColaborador) references colaborador(idColaborador)
);


-- Um vendedor pode agendar a consulta para o cliente, o id usuario será o id do cliente

create table agendaConsulta(
	idConsulta int not null auto_increment,
	dataConsulta datetime,
	descricao varchar(300),
	idNutricionista int,
	idCliente int not null,
	primary key(idConsulta),
	constraint fk_idNutricionistaConsulta foreign key(idNutricionista) references nutricionista(idNutricionista),
    constraint fk_idClienteConsulta foreign key(idCliente) references cliente(idCliente)
);

-- Criando a tabela Prontuario
create table prontuarioConsulta(
	idProntuario int not null auto_increment,
	idConsulta int not null,
	diagnostico varchar(1000),
	idNutricionista int not null,
	idCliente int not null,
	primary key(idProntuario),
	foreign key(idNutricionista) references nutricionista(idNutricionista),
	foreign key(idCliente) references cliente(idCliente),
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
	idProduto int not null auto_increment,
	idCategoria int not null,
	codigo int not null,
    marca varchar(50),
    nome varchar(50),
    descricao varchar(300),                     
	validade date not null,
	lote int not null,
    statusProduto varchar(50) , 
	valor decimal(10,2),
	idFornecedor int not null,
	primary key(idProduto),
	foreign key(idFornecedor) references fornecedor(idFornecedor),
    foreign key(idCategoria) references categoriaProduto(idCategoria)
);

-- coloquei alto increment para gerar automatico, qualquer coisa me avisa que retiramos 
create table pedido(
	idPedido int not null auto_increment,
	dataPedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	idCliente int not null,
	idColaborador int not null, -- vendedor
	primary key (idPedido),
	foreign key(idCliente) references cliente(idCliente),
	foreign key(idColaborador) references colaborador(idColaborador)
);



create Table itemPedido(
	idItemPedido int not null auto_increment,
	idPedido int not null,
    codProduto int not null,
    quantidade int not null,
    valorUnitario decimal(10,2),
    primary key(idItemPedido),
    foreign key(idPedido) references pedido(idPedido),
    foreign key(codProduto) references produto(idProduto)
);
    
create table notaFiscal(
	idNota int not null auto_increment,
    cpf int not null,
    idPedido int not null,
    primary key(idNota),
    constraint fk_idPedido foreign key(idPedido) references pedido(idPedido)
    );
    

-- ############################################### INSERTS ############################################################

-- Tipo colaborador
insert into tipoColaborador(tipo) values('Gerente'),('Vendedor'),('Nutricionista');

-- Colaborador
insert into colaborador(login,senha,email,nome,sobrenome,telefone,idTipo) values
('admin','admin','admin@gmail.com','admin','gomes',11974444444,1);

insert into colaborador(login,senha,email,nome,sobrenome,telefone,idTipo) values
('nutricionista','nutricionista','nutricionista@gmail.com','nutricionista','gomes',11974444444,3);

-- cliente 
insert into cliente(login,senha,email,nome,sobrenome,telefone) values
('cliente','cliente','cli@gmail.com','client','silva',1144444444);

-- Endereço Cliente

insert into endereco(rua,cidade,numero,estado,idCliente) values('rua da silva','cotia',12,'SP',1);

-- tabela nutricionista

insert into nutricionista(crn,idColaborador) values (123,3);

-- Fornecedor 
insert into fornecedor(cnpj,email,endereco,telefone) values('231','email@gmail.com','rua tal',115555);

-- tipo produto
insert into categoriaProduto(categoria) values('Massa'),('Creatina');

-- produto
insert into produto(idCategoria,codigo,marca,nome,descricao,validade,lote,statusProduto,valor,idFornecedor) values
(1,123,'new milen','whey','ganhe massa',20190505,1,'Disponivel',15,1);

-- pedido 

insert into pedido(idCliente,idColaborador) values (1,1);

-- item pedido

insert into itemPedido (idPedido,codProduto,quantidade,valorUnitario) Values(1,1,1,10);
insert into itemPedido (idPedido,codProduto,quantidade,valorUnitario) Values(1,2,1,10);


-- Exemplo de um pedido

select produto.nome, itemPedido.quantidade,itemPedido.valorUnitario 
from itemPedido INNER JOIN produto ON itemPedido.codProduto = produto.idProduto where itemPedido.idPedido=100;