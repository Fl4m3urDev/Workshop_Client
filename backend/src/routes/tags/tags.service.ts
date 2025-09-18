import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTagDto) {
    return this.prisma.tags.create({ data });
  }

  findAll() {
    return this.prisma.tags.findMany({
      include: { articles: true },
    });
  }

  findOne(id: number) {
    return this.prisma.tags.findUnique({
      where: { tag_id: id },
      include: { articles: true },
    });
  }

  update(id: number, data: UpdateTagDto) {
    return this.prisma.tags.update({
      where: { tag_id: id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.tags.delete({
      where: { tag_id: id },
    });
  }
}
