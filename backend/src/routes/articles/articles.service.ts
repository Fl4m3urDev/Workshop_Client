import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto) {
    return this.prisma.articles.create({ data: createArticleDto });
  }

  findAll() {
    return this.prisma.articles.findMany({
      include: { category: true, tags: true },
    });
  }

  findOne(article_id: number) {
    return this.prisma.articles.findUnique({
      where: { article_id: article_id },
      include: { category: true, tags: true },
    });
  }

  update(article_id: number, data: UpdateArticleDto) {
    return this.prisma.articles.update({
      where: { article_id: article_id },
      data,
    });
  }

  remove(article_id: number) {
    return this.prisma.articles.delete({
      where: { article_id: article_id },
    });
  }
}
