import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';
import ShowUserProfileService from '../services/ShowUserProfileService';
import UpdateUserProfileService from '../services/UpdateUserService';

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUserService = new ListUserService();

    const users = await listUserService.execute();

    return response.status(200).json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.status(200).json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserProfileService = new ShowUserProfileService();

    const user = await showUserProfileService.execute(id);

    return response.status(200).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;

    const updateUserProfileService = new UpdateUserProfileService();

    const user = await updateUserProfileService.execute({
      id,
      name,
      email,
    });

    return response.status(200).json(user);
  }
}

export default UsersController;
