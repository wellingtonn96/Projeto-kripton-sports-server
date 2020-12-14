import { Connection } from 'mysql'
import { connection } from '../database/dbConnection'

class ColaboradoresDao {
  private _connection: Connection

  constructor(){
      this._connection = connection()
  }

	// listarColaboradores(){
	// 	return new Promise((resolve, reject)=>{
	// 		this._connection.query('select * from tipoColaborador t, colaborador u where t.idTipoColaborador =  u.idTipo order by u.idColaborador desc',
	// 		(error, results)=>{
	// 			if(error){
	// 				reject(error)
	// 			}else(
	// 				resolve(results)
	// 			)
	// 		});
	// 	})
	// }

	public create(colaborador: any){
		return new Promise((resolve, reject)=>{
			this._connection.query('insert into colaborador set ? ',
			 [colaborador],
			 (error, results)=>{
				 if(error){
					 reject(error)
				 }else{
					 resolve(results)
				 }
			 })
		})
	}

	// excluirColaborador(id: any){
	// 	return new Promise((resolve, reject)=>{
	// 		this._connection.query("DELETE FROM colaborador  WHERE idColaborador = ? ",
	// 		[id],
	// 		 (error, results)=>{
	// 			 if(error){
	// 				 reject(error)
	// 			 }else{
	// 				 resolve(results)
	// 			 }
	// 		 })
	// 	})
	// }

	// detalhesColaborador(id: any){
	// 	return new Promise((resolve, reject)=>{
	// 		this._connection.query('insert into colaborador set ? ',
	// 		[id],
	// 		(error, results)=>{
	// 			if(error){
	// 				reject(error)
	// 			}else{
	// 				resolve(results)
	// 			}
	// 		})
	//    })
  //  }

	// dadosColaborador(id: any){
	// 	return new Promise((resolve, reject)=>{
	// 		this._connection.query('SELECT * FROM colaborador WHERE idColaborador = ?',
	// 			[id],
	// 			(error, results)=>{
	// 				if(error){
	// 					reject(error)
	// 				}else{
	// 					resolve(results)
	// 				}
  //     })
	// 	})
	// }

	// salvarColaborador(dados: any, id: any){
	// 	return new Promise((resolve, reject)=>{
	// 	this._connection.query("UPDATE colaborador set ? WHERE idColaborador = ? ",
	// 	[dados, id],
	// 		(error, results)=>{
	// 			if(error){
	// 				reject(error)
	// 			}else{
	// 				resolve(results)
	// 			}
	// 		})
	// 	})
	// }

	// cadastrarNutricionista(dados: any){
	// 	return new Promise((resolve, reject)=>{
	// 		this._connection.query('insert into nutricionista set ? ',
	// 		[dados],
	// 		(error, results)=>{
	// 			if(error){
	// 				reject(error)
	// 			}else{
	// 				resolve(results)
	// 			}
	// 		})
	// 	})
	// }

	// autenticar(colaborador: any, req, res){
	// 	var login = colaborador.login
	// 	var senha = colaborador.senha
	// 	return new Promise((resolve, reject)=>{
	// 		this._connection.query('select * from colaborador where login = ? AND senha = ?', [
	// 			login, senha
	// 		], (error, results)=>{
	// 			if (error){
	// 				reject(error)
	// 			}else{

	// 				if(!results.length > 0){
	// 					reject('colaborador ou senha incorretos')
	// 				}else{
	// 					if(results[0].senha !== senha){
	// 						reject("colaborador ou senha incorretos")
	// 					}else{
	// 						resolve(results)
	// 					}
	// 				}
	// 			}
	// 		})
	// 	})
	// }
}

export default ColaboradoresDao
