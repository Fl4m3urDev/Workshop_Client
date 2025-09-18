import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateUserInterestDto } from './dto/create-userinterest.dto';
import { UpdateUserInterestDto } from './dto/update-userinterest.dto';

@Injectable()
export class UserInterestsService {
  constructor(private prisma: PrismaService) {}

  create(createUserInterestDto: CreateUserInterestDto) {
    return this.prisma.userInterests.create({ data: createUserInterestDto });
  }

  findAll() {
    return this.prisma.userInterests.findMany({
      include: { user: true, category: true },
    });
  }

  findOne(user_id: number, category_id: number) {
    return this.prisma.userInterests.findUnique({
      where: { user_id_category_id: { user_id, category_id } },
      include: { user: true, category: true },
    });
  }

  update(user_id: number, category_id: number, data: UpdateUserInterestDto) {
    return this.prisma.userInterests.update({
      where: { user_id_category_id: { user_id, category_id } },
      data,
    });
  }

  remove(user_id: number, category_id: number) {
    return this.prisma.userInterests.delete({
      where: { user_id_category_id: { user_id, category_id } },
    });
  }
}
