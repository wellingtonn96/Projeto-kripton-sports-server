import { Router } from 'express';
import { container } from 'tsyringe';
import { CustomerRepository } from '../../mysql/repositories/CustomerRepository';
import { CreateCustomerService } from '../../../services/CreateCustomerService';
import { DeleteCustomerService } from '../../../services/DeleteCustomerService';
import { FindCustomerService } from '../../../services/FindCustomerService';
import { UpdateCustomerService } from '../../../services/UpdateCustomerService';

const customersRoutes = Router();

customersRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteCollaborator = container.resolve(DeleteCustomerService);

  await deleteCollaborator.execute(id);

  return response.json();
});

customersRoutes.put('/:id', async (request, response) => {
  const { id } = request.params;
  const data = request.body;

  const updateCollaborator = container.resolve(UpdateCustomerService);

  const results = await updateCollaborator.execute(id, data);

  return response.json(results);
});

customersRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const findCustomer = container.resolve(FindCustomerService);

  const results = await findCustomer.execute(id);

  return response.json(results);
});

customersRoutes.get('/', async (request, response) => {
  const customerRepository = new CustomerRepository();

  const results = await customerRepository.findAll();

  return response.json(results);
});

customersRoutes.post('/', async (request, response) => {
  const { login, senha, email, nome, sobrenome, telefone } = request.body;

  const createCustomer = container.resolve(CreateCustomerService);

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
