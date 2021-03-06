import { Request, Response } from 'express';
import AuthenticatedUserService from '../services/AuthenticatedUserService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticatedUserService = new AuthenticatedUserService();

    const { user, token } = await authenticatedUserService.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}

export default SessionsController;
