import { ICollaaboratorsRepository } from '@modules/collaborators/repositories/ICollaboratorsRepository';
import { Connection } from 'mysql';
import { connection } from '@shared/infra/mysql/dbConnection';
import { Collaborator } from '../entities/Collaborator';

class CollaboratorRepository implements ICollaaboratorsRepository {
  private connection: Connection;

  constructor() {
    this.connection = connection();
  }

  public async findAll(): Promise<Collaborator[]> {
    const collaborators: Collaborator[] = await new Promise(
      (resolve, reject) => {
        this.connection.query(
          'select * from tipoColaborador t, colaborador u where t.idTipoColaborador =  u.idTipo order by u.idColaborador desc',
          (error, results) => {
            if (error) {
              reject(error);
            } else resolve(results);
          },
        );
      },
    );

    return collaborators;
  }

  public async create(data: Collaborator): Promise<Collaborator> {
    const { insertId } = await new Promise((resolve, reject) => {
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

    const collaborator = await this.findOneById(insertId);

    return collaborator;
  }

  public async findOneById(id: string): Promise<Collaborator> {
    const [findOne] = await new Promise((resolve, reject) => {
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

    if (!findOne) return findOne;

    const collaborator = new Collaborator(findOne);

    return collaborator;
  }

  public async findByLogin(login: string): Promise<Collaborator> {
    const [findCollaborator] = await new Promise((resolve, reject) => {
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

    if (!findCollaborator) return findCollaborator;

    const collaborator = new Collaborator(findCollaborator);

    return collaborator;
  }

  public async deleteById(id: string): Promise<void> {
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

  public async updateById(
    id: string,
    data: Collaborator,
  ): Promise<Collaborator> {
    await new Promise((resolve, reject) => {
      this.connection.query(
        'UPDATE colaborador set ? WHERE idColaborador = ? ',
        [data, id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });

    const collaborator = await this.findOneById(id);

    return collaborator;
  }
}

export { CollaboratorRepository };
