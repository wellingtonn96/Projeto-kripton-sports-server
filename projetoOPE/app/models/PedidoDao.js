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

	inserirItemPedido(dados){
		return new Promise((resolve, reject)=>{
			this._connection.query('INSERT INTO itemPedido set ? ',
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
	//produto.nome, itemPedido.quantidade,itemPedido.valorUnitario 

	itemsPedido(idPedido){
		return new Promise((resolve, reject)=>{
			this._connection.query('select produto.nome, produto.codigo, produto.valor, itemPedido.quantidade, itemPedido.valorUnitario, itemPedido.quantidade * produto.valor as soma, Sum(itemPedido.quantidade * itemPedido.valorUnitario) as subtotal'+ 
				' from itemPedido INNER JOIN produto ON itemPedido.codProduto = produto.idProduto where itemPedido.idPedido = ? group by itemPedido.idItemPedido;',
			[idPedido],
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