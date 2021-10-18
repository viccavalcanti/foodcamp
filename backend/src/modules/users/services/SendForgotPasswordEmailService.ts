import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';
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

    const { token } = await userTokensRepository.generateToken(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email,
      },
      subject: '[Foodcamp] Recuperação de Senha',
      templateData: {
        fileTemplate: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:${process.env.PORT}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
