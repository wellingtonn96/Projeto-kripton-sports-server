class FornecedoresDao{
	constructor(connection){
		this._connection = connection
	}
	
	cadastrarFornecedor(id){
		return new Promise((resolve, reject)=>{
			this._connection.query('INSERT INTO fornecedor set ?'
			, [id],
			(error, results)=>{
				if(error){
					reject(error)
				}else{
					resolve(results)
				}
			})
		})
	}

	listarFornecedor(){
		return new Promise((resolve, reject)=>{
			this._connection.query('SELECT * FROM fornecedor ORDER BY idFornecedor DESC',
			(error, results)=>{
				if(error){
					reject(error)
				}else{
					resolve(results)
				}
			})
		})
	}

	excluirFornecedor(id){
		return new Promise((resolve, reject)=>{
			this._connection.query("DELETE FROM fornecedor WHERE idFornecedor = ?"
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

	dadosFornecedor(id){
		return new Promise((resolve, reject)=>{
			this._connection.query('SELECT * FROM fornecedor WHERE idFornecedor = ?'
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

	atualizarFornecedor(dados, id){
		return new Promise((resolve, reject)=>{
			this._connection.query("UPDATE fornecedor set ? WHERE idFornecedor = ? ",
			[dados, id],
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
module.exports = () => FornecedoresDao;




