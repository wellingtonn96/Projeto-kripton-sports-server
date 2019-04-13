class UsuariosDao{
	constructor(connection){
		this._connection = connection
	}

	listarUsuarios(){
		return new Promise((resolve, reject)=>{
			this._connection.query('select * from tipoUsuario t, usuario u where t.idTipoUsuario =  u.idTipo order by u.idUsuario desc',			
			(error, results)=>{
				if(error){
					reject(error)
				}else(
					resolve(results)
				)
			});
		})
	}

	cadastrarUsuario(usuario){
		return new Promise((resolve, reject)=>{
			this._connection.query('insert into usuario set ? ',
			 [usuario],
			 (error, results)=>{
				 if(error){
					 reject(error)
				 }else{
					 resolve(results)
				 }
			 })
		})
	}

	excluirUsuario(id){
		return new Promise((resolve, reject)=>{
			this._connection.query("DELETE FROM usuario  WHERE idUsuario = ? ",
			[id],
			 (error, results)=>{
				 if(error){
					 reject(error)
				 }else{
					 resolve(results)
				 }
			 })
		})
	}

	detalhesUsuario(id){
		return new Promise((resolve, reject)=>{
			this._connection.query('insert into usuario set ? ',
			[id],
			(error, results)=>{
				if(error){
					reject(error)
				}else{
					resolve(results)
				}
			})
	   })
   }
	
	dadosUsuario(id){
		return new Promise((resolve, reject)=>{
			this._connection.query('SELECT * FROM usuario WHERE idUsuario = ?', 
				[id],
				(error, results)=>{
					if(error){
						reject(error)
					}else{
						resolve(results)
					}
				})
		})
	}

	salvarUsuario(dados, id){
		return new Promise((resolve, reject)=>{
		this._connection.query("UPDATE usuario set ? WHERE idUsuario = ? ",
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

	cadastrarNutricionista(dados){
		return new Promise((resolve, reject)=>{
			this._connection.query('insert into nutricionista set ? ',
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

	autenticar(usuario, req, res){
		var login = usuario.login
		var senha = usuario.senha
		return new Promise((resolve, reject)=>{
			this._connection.query('select * from usuario where login = ? AND senha = ?', [
				login, senha
			], (error, results)=>{
				if (error){
					reject(error)
				}else{
	
					if(!results.length > 0){
						reject('usuario ou senha incorretos')
					}else{
						if(results[0].senha !== senha){
							reject("usuario ou senha incorretos")
						}else{
							resolve(results)
						}
					}
				}
			})
		})
	}
}

module.exports = () => UsuariosDao