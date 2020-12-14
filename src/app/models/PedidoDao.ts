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
			this._connection.query('SELECT itemPedido.idItemPedido, produto.nome, produto.codigo, produto.valor, itemPedido.quantidade, itemPedido.valorUnitario, itemPedido.quantidade * produto.valor AS soma, Sum(itemPedido.quantidade * itemPedido.valorUnitario) AS subtotal'+ 
				' FROM itemPedido INNER JOIN produto ON itemPedido.codProduto = produto.idProduto WHERE itemPedido.idPedido = ? GROUP BY itemPedido.idItemPedido ORDER BY itemPedido.idItemPedido DESC;',
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
	/*
	cancelarItem(id){
		return new Promise((resolve, reject)=>{
			this._connection.query('DELETE FROM itemPedido WHERE idItemPedido = ?;',
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
	*/
	insertFormaPgto(dados, id){
		return new Promise((resolve, reject)=>{
			this._connection.query('UPDATE pedido set ? WHERE idPedido = ? ',
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

module.exports = () => PedidoDao