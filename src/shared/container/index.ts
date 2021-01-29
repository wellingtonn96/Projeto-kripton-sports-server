import { container } from 'tsyringe';

import { ICollaaboratorsRepository } from '@modules/collaborators/repositories/ICollaboratorsRepository';
import { CollaboratorRepository } from '@modules/collaborators/infra/mysql/repositories/CollaboratorsRepository';

import { ICustomerRepository } from '@modules/customers/repositories/ICustomersRepository';
import { CustomerRepository } from '@modules/customers/infra/mysql/repositories/CustomerRepository';

import { ICategoryProductRepository } from '@modules/products/repositories/ICategoryProductRepository';
import { CategoryProductRepository } from '@modules/products/infra/mysql/repositories/CategoryProductRepository';

import { ProductRepository } from '@modules/products/infra/mysql/repositories/ProductRepository';
import { IProductRepository } from '@modules/products/repositories/IProductRepository';

import { ISupplierRepository } from '@modules/suppliers/repositories/ISupplierRepository';
import { SupplierRepository } from '@modules/suppliers/infra/mysql/repositories/SupplierRepository';

container.registerSingleton<ICollaaboratorsRepository>(
  'CollaboratorRepository',
  CollaboratorRepository,
);

container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  CustomerRepository,
);

container.registerSingleton<ICategoryProductRepository>(
  'CategoryProductRepository',
  CategoryProductRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<ISupplierRepository>(
  'SupplierRepository',
  SupplierRepository,
);
