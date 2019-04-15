class ConsultaDao{
    constructor(connection){
        this._connection = connection
    }

    
    nutricionistas(){
        return new Promise((resolve, reject)=>{
            this._connection.query('select nome, idNutricionista from usuario u, nutricionista n where u.idUsuario =  n.idUsuario',
            (error, result)=>{
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
    }

    clientes(){
        return new Promise((resolve, reject)=>{
            this._connection.query("select * from usuario where idTipo = 2",
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
}

module.exports = () => ConsultaDao