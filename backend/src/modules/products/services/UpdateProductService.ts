import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    description,
    price,
    quantity,
  }: IProduct): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const nameExists = await productsRepository.findByName(name);

    if (nameExists) {
      throw new AppError('There is already a product with this name!');
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
