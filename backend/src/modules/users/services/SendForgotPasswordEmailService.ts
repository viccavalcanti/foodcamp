import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import EtherealMail from '@config/mail/EtherealMail';
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

    const token = await userTokensRepository.generateToken(user.id);

    await EtherealMail.sendMail({
      to: email,
      body: `Solicitação de recuperação de senha recebida: ${token?.token}`,
    });
  }
}

export default SendForgotPasswordEmailService;
