// import { Connection } from 'mysql'
// import { connection } from '../../config/dbConnection'

// class ProdutosDao{
//     public _connection: Connection

//     constructor(){
//         this._connection = connection()
//     }


// 	cadastrarProduto(dados: any){
// 		return new Promise((resolve, reject)=>{
// 			this._connection.query('INSERT INTO produto set ? ',
// 			[dados],
// 			(error, results)=>{
// 				if(error){
// 					reject(error)
// 				}else{
// 					resolve(results)
// 				}
// 			})
// 		})
// 	}

// 	listarProduto(){
// 		return new Promise((resolve, reject)=>{
// 		this._connection.query('SELECT * FROM produto',
// 			(error, results)=>{
// 				if(error){
// 					reject(error)
// 				}else{
// 					resolve(results)
// 				}
// 			})
// 		})
// 	}

// 	excluirProduto(id: any){
// 		return new Promise((resolve, reject)=>{
// 		this._connection.query("DELETE FROM produto  WHERE idProduto = ? "
// 		,[id],
// 			(error, results)=>{
// 				if(error){
// 					reject(error)
// 				}else{
// 					resolve(results)
// 				}
// 			})
// 		})
// 	}

// 	dadosProduto(id: any){
// 		return new Promise((resolve, reject)=>{
// 		this._connection.query('SELECT * FROM produto WHERE idProduto = ?'
// 			,[id],
// 			(error, results)=>{
// 				if(error){
// 					reject(error)
// 				}else{
// 					resolve(results)
// 				}
// 			})
// 		})
// 	}

// 	atualizarProduto(dados: any, id: any){
// 		return new Promise((resolve, reject)=>{
// 		this._connection.query("UPDATE produto set ? WHERE idProduto = ? "
// 		,[dados, id],
// 			(error, results)=>{
// 				if(error){
// 					reject(error)
// 				}else{
// 					resolve(results)
// 				}
// 			})
// 		})
// 	}


// 	cadastrarCategoria(dados: any){
// 		return new Promise((resolve, reject)=>{
// 			this._connection.query('INSERT INTO categoriaProduto set ? ',
// 			[dados],
// 			(error, results)=>{
// 				if(error){
// 					reject(error)
// 				}else{
// 					resolve(results)
// 				}
// 			})
// 		})
// 	}

// 	listarCategoria(){
// 		return new Promise((resolve, reject)=>{
// 		this._connection.query('SELECT * FROM categoriaProduto',
// 			(error, results)=>{
// 				if(error){
// 					reject(error)
// 				}else{
// 					resolve(results)
// 				}
// 			})
// 		})
// 	}

// 	listaVencimento(){
// 		return new Promise((resolve, reject)=>{
// 			this._connection.query('SELECT idProduto, codigo, nome, marca, validade, lote, DATEDIFF(validade,NOW()) AS dias_para_vencimento FROM produto LIMIT 5;',
// 			(error, results)=>{
// 				if(error){
// 					reject(error)
// 				}else{
// 					resolve(results)
// 				}
// 			})
// 		})
// 	}

// 	qtdEstoque(id: any){
// 		return new Promise((resolve, reject)=>{
// 			this._connection.query('SELECT qtdeEstoque FROM produto where idProduto = ?'
// 			,[id],
// 			(error, results)=>{
// 				if(error){
// 					reject(error)
// 				}else{
// 					resolve(results)
// 				}
// 			})
// 		})
// 	}



// }


// module.exports = () => ProdutosDao


