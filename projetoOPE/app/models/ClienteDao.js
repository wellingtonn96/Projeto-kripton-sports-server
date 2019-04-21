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

}

module.exports = () => ClienteDao