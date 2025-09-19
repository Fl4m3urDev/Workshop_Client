import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateUserActionDto } from './dto/create-useraction.dto';
import { UpdateUserActionDto } from './dto/update-useraction.dto';

@Injectable()
export class UserActionsService {
  constructor(private prisma: PrismaService) {}

  create(createUserActionDto: CreateUserActionDto) {
    return this.prisma.userActions.create({ data: createUserActionDto });
  }

  findAll() {
    return this.prisma.userActions.findMany({
      include: { user: true, article: true },
    });
  }

  findOne(id: number) {
    return this.prisma.userActions.findUnique({
      where: { action_id: id },
      include: { user: true, article: true },
    });
  }

  update(id: number, data: UpdateUserActionDto) {
    return this.prisma.userActions.update({
      where: { action_id: id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.userActions.delete({
      where: { action_id: id },
    });
  }
}
