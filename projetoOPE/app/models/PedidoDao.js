class PedidoDao{
    constructor(connection){
        this._connection = connection
    }

    criarPedido(dados){
		return new Promise((resolve, reject)=>{
			this._connection.query('INSERT INTO pedido set ? ',
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
}

module.exports = () => PedidoDao