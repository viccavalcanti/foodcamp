import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

interface IProduct {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({
    name,
    description,
    price,
    quantity,
  }: IProduct): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already a product with this name!');
    }

    const newProduct = productsRepository.create({
      name,
      description,
      price,
      quantity,
    });

    await productsRepository.save(newProduct);

    return newProduct;
  }
}

export default CreateProductService;
