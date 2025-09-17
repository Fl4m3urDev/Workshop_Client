import { Injectable, NotFoundException } from '@nestjs/common';
import { Session as SessionExpress } from 'express-session';
import { Roles } from 'src/guards/is-authorized/roles';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as Utils from '../../utils/utils';
import { Users as PrismaUser } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}

  create(createUserDto: CreateUserDto): Promise<PrismaUser> {
    return this.prisma.users.create({ data: createUserDto as any });
  }

  login(session: SessionExpress) {
    session.user = { isLogged: true, role: Roles.Admin };
    return session.user;
  }

  findAll(): Promise<PrismaUser[]> {
    return this.prisma.users.findMany();
  }

  /** Shuffle implémenté avec Fisher–Yates */
  async findAllShuffle(): Promise<PrismaUser[]> {
    const users = await this.prisma.users.findMany();
    for (let i = users.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [users[i], users[j]] = [users[j], users[i]];
    }
    return users;
  }

  /** Remplacement de asyncForEach par for..of */
  async findAllAsyncForEach() {
    const data = [];
    const users = await this.prisma.users.findMany();
    for (const user of users) {
      const userDb = await this.prisma.users.findUnique({ where: { user_id: user.user_id } });
      if (!userDb) continue;
      const clone = { ...userDb };
      delete (clone as any).user_id;
      data.push({ user_id: user.user_id, data: clone });
    }
    return data;
  }

  admin() {
    return { msg: 'Hello Skulljs Admin !', production: this.configService.get('production') };
  }

  async crypto() {
    const rawData = 'iAmATestString';
    const encryptedData = Utils.crypto.encrypt(rawData);
    return {
      rawData: Utils.crypto.decrypt(encryptedData),
      encryptedData: encryptedData,
      hash: await Utils.crypto.hash(rawData),
    };
  }

  sendMail() {
    Utils.sendMail(this.mailerService, {
      to: 'user.name@example.com',
      subject: '[skulljs] The users have been created ✔',
      template: 'users',
      context: { name: 'john doe' },
    });
  }

  findOne(user_id: number) {
    return this.prisma.users.findUnique({ where: { user_id } });
  }

  update(user_id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({ where: { user_id }, data: updateUserDto as any });
  }

  remove(user_id: number) {
    return this.prisma.users.delete({ where: { user_id } });
  }

  async printPDFFromClass(user_id: number): Promise<Buffer> {
    const user = await this.prisma.users.findUnique({ where: { user_id } });
    if (!user) throw new NotFoundException('User not found');

    const pdf = new Utils.PDFGenerator()
      .createDocument()
      .addNewPageListener()
      .newPage()
      .writeTitle('Export User')
      .writeSubtitle(`User N°${user.user_id}`)
      .writeLabelValuePair('username', user.username ?? '—', 200)
      .writeLabelValuePair('email', user.email ?? '—', 200)
      .writeLabelValuePair('subscription', String(user.subscription_type), 200)
      .writeLabelValuePair('created_at', user.created_at?.toISOString() ?? '—', 200);

    return pdf.closeAndGetBytes();
  }

  async printPDFFromTemplate(user_id: number): Promise<Buffer> {
    const user = await this.prisma.users.findUnique({ where: { user_id } });
    if (!user) throw new NotFoundException('User not found');
    return Utils.templateToPDF({ template: 'users', context: { user } });
  }
}
