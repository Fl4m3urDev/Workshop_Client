import { Injectable, NotFoundException } from '@nestjs/common';
import { Session as SessionExpress } from 'express-session';
import { UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
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
  ) {}

  create(createCatDto: CreateUserDto) {
    return this.prisma.users.create({ data: createCatDto });
  }

  login(session: SessionExpress) {
    session.user = { isLogged: true, role: Roles.Admin };
    return session.user;
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

  // admin() {
  //   return { msg: 'Hello Workshop_Client Admin !', production: this.configService.get('production') };
  // }

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
