import { Injectable, NotFoundException } from '@nestjs/common';
import { Session as SessionExpress } from 'express-session';
import { UnauthorizedException, ConflictException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Roles } from '../../guards/is-authorized/roles';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as Utils from '../../utils/utils';

@Injectable()
export class UsersService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) { }

  create(createUserDto: CreateUserDto) {
    return this.prisma.users.create({ data: createUserDto });
  }

  async login(session: SessionExpress, email: string, password: string) {
    // 1. Vérification de l'existence de l'utilisateur
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Utilisateur introuvable');
    }

    // 2. Vérification du mot de passe
    const isPasswordValid = await Utils.crypto.hash(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    // 3. Mise en session uniquement des infos nécessaires
    session.user = {
      isLogged: true,
      id: user.user_id,
      email: user.email,
      role: Roles.Admin
    };

    // 4. Retourne des infos filtrées (jamais le mot de passe)
    return {
      id: user.user_id,
      email: user.email,
      role: Roles.Admin,
    };
  }

  logout(session: SessionExpress) {
    session.destroy((err) => {
      if (err) throw new InternalServerErrorException('Erreur lors de la déconnexion');
    });
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  async findAllAsyncForEach() {
    const data = [];
    const users = await this.prisma.users.findMany();
    await users.asyncForEach(async (user) => {
      const userDb = await this.prisma.users.findUnique({ where: { user_id: user.user_id } });
      delete userDb.user_id;
      data.push({ id: user.user_id, data: userDb });
    });
    return data;
  }

  async crypto() {
    const rawData = 'iAmATestString';
    const encryptedData = Utils.crypto.encrypt(rawData);
    return { rawData: Utils.crypto.decrypt(encryptedData), encryptedData: encryptedData, hash: await Utils.crypto.hash(rawData) };
  }

  sendMail() {
    Utils.sendMail(this.mailerService, {
      to: 'user.name@example.com',
      subject: '[Workshop_Client] The users have been created ✔',
      template: 'users',
      context: { name: 'john doe' },
    });
  }

  findOne(user_id: number) {
    return this.prisma.users.findUnique({ where: { user_id } });
  }

  update(user_id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({ where: { user_id }, data: updateUserDto });
  }

  remove(user_id: number) {
    return this.prisma.users.delete({ where: { user_id } });
  }

}
