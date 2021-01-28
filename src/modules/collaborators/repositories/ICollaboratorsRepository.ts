import { Collaborator } from '../infra/mysql/entities/Collaborator';
import { ICreateCollaboraatorDTO } from '../dtos/ICreateProductsDTO';

export interface ICollaaboratorsRepository {
  findAll(): Promise<Collaborator[] | undefined>;
  create(data: ICreateCollaboraatorDTO): Promise<Collaborator | undefined>;
  findOneById(id: string): Promise<Collaborator | undefined>;
  findByLogin(login: string): Promise<Collaborator | undefined>;
  deleteById(id: string): void;
  updateById(
    id: string,
    data: ICreateCollaboraatorDTO,
  ): Promise<Collaborator | undefined>;
}
