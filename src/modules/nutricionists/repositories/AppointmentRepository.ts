import { Connection } from 'mysql';
import { Appointment } from '../models/Appointment';

class AppointmentRepository {
  public connection: Connection;

  constructor(connectionDb: Connection) {
    this.connection = connectionDb;
  }

  public async create(data: Appointment): Promise<Appointment> {
    const { inserId } = await new Promise((resolve, reject) => {
      this.connection.query(
        'INSERT INTO agendaConsulta set ?',
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

    const appointment = await this.findOneById(inserId);

    return appointment;
  }

  public async findOneById(id: string): Promise<Appointment> {
    const [findAppointment] = await new Promise((resolve, reject) => {
      this.connection.query(
        'select * from agendaConsulta WHERE idConsulta = ?',
        [id],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
    });

    if (!findAppointment) return findAppointment;

    const appointment = new Appointment(findAppointment);

    return appointment;
  }

  public async findAll(): Promise<Appointment[]> {
    const appointments: Appointment[] = await new Promise((resolve, reject) => {
      this.connection.query('select * from agendaConsulta', (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    return appointments;
  }
}

export { AppointmentRepository };
