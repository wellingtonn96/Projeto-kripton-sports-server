import { Connection } from 'mysql';
import { Nutritionist } from '../infra/mysql/entities/Nutritionist';

class NutritionistsRepository {
  public connection: Connection;

  constructor(connectionDb: Connection) {
    this.connection = connectionDb;
  }

  public async findAll(): Promise<Nutritionist[]> {
    const nutritionists: Nutritionist[] = await new Promise(
      (resolve, reject) => {
        this.connection.query(
          'select nome, idNutricionista from colaborador u, nutricionista n where u.idColaborador =  n.idColaborador',
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );
      },
    );

    return nutritionists;
  }

  public async create(dados: Nutritionist): Promise<Nutritionist> {
    const { inserId } = await new Promise((resolve, reject) => {
      this.connection.query(
        'insert into nutricionista set ? ',
        [dados],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        },
      );
    });

    const nutritionist = await this.findOneById(inserId);

    return nutritionist;
  }

  public async findOneById(id: string): Promise<Nutritionist> {
    const [findOne] = await new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM nutricionista WHERE idNutricionista = ?',
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

    const nutritionist = new Nutritionist(findOne);

    return nutritionist;
  }
}

export { NutritionistsRepository };
