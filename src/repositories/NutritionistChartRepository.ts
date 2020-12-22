import { Connection } from 'mysql';
import { NutritionistChart } from '../models/NutritionistChart';

class NutritionistChartRepository {
  public connection: Connection;

  constructor(connectionDb: Connection) {
    this.connection = connectionDb;
  }

  public async create(data: NutritionistChart): Promise<NutritionistChart> {
    const { inserId } = await new Promise((resolve, reject) => {
      this.connection.query(
        'INSERT INTO prontuarioConsulta set ?',
        [data],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
    });

    const nutritionistChart = await this.findOneById(inserId);

    return nutritionistChart;
  }

  public async findOneById(id: string): Promise<NutritionistChart> {
    const [findOne] = await new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM prontuarioConsulta WHERE idProntuario = ?',
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

    const collaborator = new NutritionistChart(findOne);

    return collaborator;
  }

  public async updateById(
    id: string,
    data: NutritionistChart,
  ): Promise<NutritionistChart> {
    await new Promise((resolve, reject) => {
      this.connection.query(
        'UPDATE prontuarioConsulta set ? WHERE idProntuario = ? ',
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

    const nutritionistChart = await this.findOneById(id);

    return nutritionistChart;
  }

  public async findByAppointmentId(id: string): Promise<void> {
    const [findOne] = await new Promise((resolve, reject) => {
      this.connection.query(
        'select cliente.nome, cliente.sobrenome, cliente.idCliente, cliente.email, cliente.telefone, prontuarioConsulta.diagnostico' +
          ' from cliente INNER JOIN prontuarioConsulta ON cliente.idCliente = prontuarioConsulta.idCliente where prontuarioConsulta.idConsulta = ?',
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

    return findOne;
  }
}

export { NutritionistChartRepository };
