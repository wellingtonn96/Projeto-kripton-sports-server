import { Router } from 'express';
import { SupplierRepository } from '../../mysql/repositories/SupplierRepository';
import { CreateSupplierService } from '../../../services/CreateSupplierService';
import { DeleteSupplierService } from '../../../services/DeleteSupplierService';
import { FindSupplierService } from '../../../services/FindSupplierService';
import { UpdateSupplierService } from '../../../services/UpdateSupplierService';

const suppliersRoutes = Router();

suppliersRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteSupplier = new DeleteSupplierService(new SupplierRepository());

  await deleteSupplier.execute(id);

  return response.json();
});

suppliersRoutes.put('/:id', async (request, response) => {
  const { id } = request.params;
  const data = request.body;

  const updateSupplier = new UpdateSupplierService(new SupplierRepository());

  const results = await updateSupplier.execute(id, data);

  return response.json(results);
});

suppliersRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const supplierRepository = new FindSupplierService(new SupplierRepository());

  const results = await supplierRepository.execute(id);

  return response.json(results);
});

suppliersRoutes.get('/', async (request, response) => {
  const supplierRepository = new SupplierRepository();

  const results = await supplierRepository.findAll();

  return response.json(results);
});

suppliersRoutes.post('/', async (request, response) => {
  const { telefone, cnpj, email, endereco } = request.body;

  const createCustomer = new CreateSupplierService(new SupplierRepository());

  const results = await createCustomer.execute({
    telefone,
    cnpj,
    email,
    endereco,
  });

  return response.json(results);
});

export { suppliersRoutes };
