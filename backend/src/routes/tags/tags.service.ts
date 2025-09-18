import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  create(createTagDto: CreateTagDto) {
    return this.prisma.tags.create({ data: createTagDto });
  }

  findAll() {
    return this.prisma.tags.findMany({
      include: { articles: true },
    });
  }

  findOne(tag_id: number) {
    return this.prisma.tags.findUnique({
      where: { tag_id: tag_id },
      include: { articles: true },
    });
  }

  update(tag_id: number, updateTagDto: UpdateTagDto) {
    return this.prisma.tags.update({ where: { tag_id }, data: updateTagDto });
  }

  remove(tag_id: number) {
    return this.prisma.tags.delete({ where: { tag_id } });
  }
}
