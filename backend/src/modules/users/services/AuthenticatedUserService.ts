import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { classToClass } from 'class-transformer';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IUser {
  email: string;
  password: string;
}

interface IResponse {
  user: IUser;
}

class AuthenticatedUserService {
  public async execute({ email, password }: IUser): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    return { user: classToClass(user) };
  }
}

export default AuthenticatedUserService;
