import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IUser {
  id: string;
  name: string;
  email: string;
}

class UpdateUserProfileService {
  public async execute({ id, name, email }: IUser): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists && emailExists.id !== id) {
      throw new AppError('Email is already in use');
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserProfileService;
