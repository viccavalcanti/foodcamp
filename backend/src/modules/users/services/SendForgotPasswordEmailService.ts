import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IUser {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IUser): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist');
    }

    await userTokensRepository.generateToken(user.id);
  }
}

export default SendForgotPasswordEmailService;
