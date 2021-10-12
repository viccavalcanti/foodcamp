import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { classToClass } from 'class-transformer';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IUser {
  email: string;
  password: string;
}

interface IResponse {
  user: IUser;
  token: string;
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

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user: classToClass(user), token };
  }
}

export default AuthenticatedUserService;
