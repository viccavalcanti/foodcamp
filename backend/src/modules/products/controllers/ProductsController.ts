import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProductsService = new ListProductService();

    const products = await listProductsService.execute();

    return response.status(200).json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProductsService = new ShowProductService();

    const product = await showProductsService.execute(id);

    return response.status(200).json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, price, quantity } = request.body;

    const createProductService = new CreateProductService();

    const product = await createProductService.execute({
      name,
      description,
      price,
      quantity,
    });

    return response.status(200).json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, price, quantity } = request.body;

    const updateProductService = new UpdateProductService();

    const productUpdated = await updateProductService.execute({
      id,
      name,
      description,
      price,
      quantity,
    });

    return response.status(200).json(productUpdated);
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    const deleteProductService = new DeleteProductService();

    await deleteProductService.execute(id);

    return response.status(200).json({ deleted: true });
  }
}

export default ProductsController;
