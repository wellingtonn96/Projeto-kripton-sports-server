class ProdutosDao{
	constructor(connection) {
		this._connection = connection
	}
	
	cadastrarProduto(dados){
		return new Promise((resolve, reject)=>{
			this._connection.query('INSERT INTO produto set ? ',
			[dados],
			(error, results)=>{
				if(error){
					reject(error)
				}else{
					resolve(results)
				}
			})
		})
	}

	listarProduto(){
		return new Promise((resolve, reject)=>{
		this._connection.query('SELECT * FROM produto',
			(error, results)=>{
				if(error){
					reject(error)
				}else{
					resolve(results)
				}
			})
		})
	}

	excluirProduto(id){
		return new Promise((resolve, reject)=>{
		this._connection.query("DELETE FROM produto  WHERE idProduto = ? "
		,[id],
			(error, results)=>{
				if(error){
					reject(error)
				}else{
					resolve(results)
				}
			})
		})
	}
	
	dadosProduto(id){
		return new Promise((resolve, reject)=>{
		this._connection.query('SELECT * FROM produto WHERE idProduto = ?'
			,[id],
			(error, results)=>{
				if(error){
					reject(error)
				}else{
					resolve(results)
				}
			})
		})
	}

	atualizarProduto(dados, id){
		return new Promise((resolve, reject)=>{
		this._connection.query("UPDATE produto set ? WHERE idProduto = ? "
		,[dados, id],
			(error, results)=>{
				if(error){
					reject(error)
				}else{
					resolve(results)
				}
			})
		})
	}

	
	cadastrarCategoria(dados){
		return new Promise((resolve, reject)=>{
			this._connection.query('INSERT INTO categoriaProduto set ? ',
			[dados],
			(error, results)=>{
				if(error){
					reject(error)
				}else{
					resolve(results)
				}
			})
		})
	}

	listarCategoria(){
		return new Promise((resolve, reject)=>{
		this._connection.query('SELECT * FROM categoriaProduto',
			(error, results)=>{
				if(error){
					reject(error)
				}else{
					resolve(results)
				}
			})
		})
	}

	cadastrarDesconto(dados){
		return new Promise((resolve, reject)=>{
			this._connection.query('INSERT INTO desconto set ? '
			,[dados],
			(error, results)=>{
				if(error){
					reject(error)
				}else{
					resolve(results)
				}
			})
		})
	}

	listarDesconto(){
		return new Promise((resolve, reject)=>{
		this._connection.query('SELECT * FROM desconto d, produto p where d.idProduto = p.idProduto',
			(error, results)=>{
				if(error){
					reject(error)
				}else{
					resolve(results)
				}
			})
		})
	}

	listaVencimento(){
		return new Promise((resolve, reject)=>{
			this._connection.query('SELECT idProduto, codigo, nome, marca, validade, lote, DATEDIFF(validade,NOW()) AS dias_para_vencimento FROM produto;',
			(error, results)=>{
				if(error){
					reject(error)
				}else{
					resolve(results)
				}
			})
		})
	}


}


module.exports = () => ProdutosDao


