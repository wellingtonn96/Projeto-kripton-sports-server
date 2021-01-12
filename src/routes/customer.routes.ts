import { Router } from 'express';
import { connection } from '../database/dbConnection';
import { CustomerRepository } from '../repositories/CustomerRepository';
import { CreateCustomerService } from '../services/CreateCustomerService';
import { DeleteCustomerService } from '../services/DeleteCustomerService';
import { FindCustomerService } from '../services/FindCustomerService';
import { UpdateCustomerService } from '../services/UpdateCustomerService';

const customersRoutes = Router();

customersRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteCollaborator = new DeleteCustomerService();

  await deleteCollaborator.execute(id);

  return response.json();
});

customersRoutes.put('/:id', async (request, response) => {
  const { id } = request.params;
  const data = request.body;

  const deleteCollaborator = new UpdateCustomerService();

  const results = await deleteCollaborator.execute(id, data);

  return response.json(results);
});

customersRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const customerRepository = new FindCustomerService();

  const results = await customerRepository.execute(id);

  return response.json(results);
});

customersRoutes.get('/', async (request, response) => {
  const customerRepository = new CustomerRepository(connection());

  const results = await customerRepository.findAll();

  return response.json(results);
});

customersRoutes.post('/', async (request, response) => {
  const { login, senha, email, nome, sobrenome, telefone } = request.body;

  const createCustomer = new CreateCustomerService();

  const results = await createCustomer.execute({
    login,
    senhaEncrypt: senha,
    email,
    nome,
    sobrenome,
    telefone,
  });

  return response.json(results);
});

export { customersRoutes };
