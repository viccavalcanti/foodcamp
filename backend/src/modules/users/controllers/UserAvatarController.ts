import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { file } = request;
    const updateUserAvatarService = new UpdateUserAvatarService();

    if (!file) {
      throw new AppError('Error uploading file!');
    }

    const user = await updateUserAvatarService.execute({
      userId: id,
      avatarFileName: file.filename,
    });

    return response.json(user);
  }
}

export default UserAvatarController;
