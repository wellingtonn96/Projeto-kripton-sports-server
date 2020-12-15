import { Connection } from 'mysql';
import { connection } from '../database/dbConnection';
import { Collaborator } from '../models/Collaborator';

class CollaboratorRepository {
  private connection: Connection;

  constructor() {
    this.connection = connection();
  }

  public findAll() {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'select * from tipoColaborador t, colaborador u where t.idTipoColaborador =  u.idTipo order by u.idColaborador desc',
        (error, results) => {
          if (error) {
            reject(error);
          } else resolve(results);
        },
      );
    });
  }

  public create(data: Collaborator): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'insert into colaborador set ? ',
        [data],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });
  }

  public findOneById(id: string) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM colaborador WHERE idColaborador = ?',
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });
  }

  public findByLogin(login: string) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM colaborador WHERE login = ?',
        [login],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });
  }

  public deleteById(id: string) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'DELETE FROM colaborador WHERE idColaborador = ? ',
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });
  }

  public updateById(dados: Collaborator, id: string): Promise<Collaborator> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'UPDATE colaborador set ? WHERE idColaborador = ? ',
        [dados, id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });
  }

  // cadastrarNutricionista(dados: any){
  // 	return new Promise((resolve, reject)=>{
  // 		this.connection.query('insert into nutricionista set ? ',
  // 		[dados],
  // 		(error, results)=>{
  // 			if(error){
  // 				reject(error)
  // 			}else{
  // 				resolve(results)
  // 			}
  // 		})
  // 	})
  // }

  // autenticar(colaborador: any, req, res){
  // 	var login = colaborador.login
  // 	var senha = colaborador.senha
  // 	return new Promise((resolve, reject)=>{
  // 		this.connection.query('select * from colaborador where login = ? AND senha = ?', [
  // 			login, senha
  // 		], (error, results)=>{
  // 			if (error){
  // 				reject(error)
  // 			}else{

  // 				if(!results.length > 0){
  // 					reject('colaborador ou senha incorretos')
  // 				}else{
  // 					if(results[0].senha !== senha){
  // 						reject("colaborador ou senha incorretos")
  // 					}else{
  // 						resolve(results)
  // 					}
  // 				}
  // 			}
  // 		})
  // 	})
  // }
}

export { CollaboratorRepository };
