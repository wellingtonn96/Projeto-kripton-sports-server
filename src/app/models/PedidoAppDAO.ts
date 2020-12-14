class PedidoAppDAO{
    constructor(connection){
        this._connection = connection
    }

	pedidos_app(){
		return new Promise((resolve, reject)=>{
			this._connection.query('select * from pedidoApp',
			(error, results)=>{
				if(error){
					reject(error)
				}else{
					resolve(results)
				}
			})
		})
	}


	statusCompraApp(dados, id){
		return new Promise((resolve, reject)=>{
			this._connection.query('UPDATE pedidoApp set ? WHERE idPedido = ? ',
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

	detalhesPedidoApp(id){
		return new Promise((resolve, reject)=>{
			this._connection.query('select * from pedidoApp WHERE idPedido = ? ',
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

}

module.exports = () => PedidoAppDAO