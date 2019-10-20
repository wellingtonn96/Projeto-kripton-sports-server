class ClienteDao{
    constructor(connection){
        this._connection = connection
    }

    clientes(){
        return new Promise((resolve, reject)=>{
            this._connection.query("select * from cliente",
            (error, result)=>{
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
    }


	cadastrarCliente(cliente){
		return new Promise((resolve, reject)=>{
			this._connection.query('insert into cliente set ? ',
			 [cliente],
			 (error, results)=>{
				 if(error){
					 reject(error)
				 }else{
					 resolve(results)
				 }
			 })
		})
	}

	excluirCliente(id){
		return new Promise((resolve, reject)=>{
			this._connection.query("DELETE FROM cliente  WHERE idCliente = ? ",
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

	detalhesCliente(id){
		return new Promise((resolve, reject)=>{
			this._connection.query('insert into cliente set ? ',
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
	
	dadosCliente(id){
		return new Promise((resolve, reject)=>{
			this._connection.query('SELECT * FROM cliente WHERE idCliente = ?', 
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

	salvarCliente(dados, id){
		return new Promise((resolve, reject)=>{
		this._connection.query("UPDATE cliente set ? WHERE idCliente = ? ",
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

module.exports = () => ClienteDao