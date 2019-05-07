class ConsultaDao{
    constructor(connection){
        this._connection = connection
    }

    
    nutricionistas(){
        return new Promise((resolve, reject)=>{
            this._connection.query('select nome, idNutricionista from colaborador u, nutricionista n where u.idColaborador =  n.idColaborador',
            (error, result)=>{
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
    }

    agendaConsulta(dados){
        return new Promise((resolve, reject)=>{
            this._connection.query('INSERT INTO agendaConsulta set ?',[dados],
            (error, result)=>{
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
    }

    consultasMarcadas(){
        return new Promise((resolve, reject)=>{
            this._connection.query('select * from agendaConsulta',
            (error, result)=>{
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
    }

    inserirProntuario(dados){
        return new Promise((resolve, reject)=>{
            this._connection.query('INSERT INTO prontuarioConsulta set ?',[dados],
            (error, result)=>{
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
    }

    cadastrarDiagnostico(dados, id){
		return new Promise((resolve, reject)=>{
		this._connection.query("UPDATE prontuarioConsulta set ? WHERE idConsulta = ? ",
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
    
    dadosCliente(idConsulta){
        console.log(idConsulta)
		return new Promise((resolve, reject)=>{
            this._connection.query('select cliente.nome, cliente.sobrenome, cliente.idCliente, cliente.email, cliente.telefone, prontuarioConsulta.diagnostico'+
            ' from cliente INNER JOIN prontuarioConsulta ON cliente.idCliente = prontuarioConsulta.idCliente where prontuarioConsulta.idConsulta = ?',
			[idConsulta],
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

module.exports = () => ConsultaDao