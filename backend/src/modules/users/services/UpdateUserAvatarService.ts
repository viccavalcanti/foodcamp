import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { classToClass } from 'class-transformer';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';

interface IUser {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: IUser): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found!', 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return classToClass(user);
  }
}

export default UpdateUserAvatarService;
