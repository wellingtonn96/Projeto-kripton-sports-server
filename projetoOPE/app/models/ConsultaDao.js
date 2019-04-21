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
}

module.exports = () => ConsultaDao