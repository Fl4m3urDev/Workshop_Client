import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateArticleTagDto } from './dto/create-articletag.dto';

@Injectable()
export class ArticleTagsService {
  constructor(private prisma: PrismaService) {}

  create(createArticleTagDto: CreateArticleTagDto) {
    return this.prisma.articleTags.create({ data: createArticleTagDto });
  }

  findAll() {
    return this.prisma.articleTags.findMany({
      include: { article: true, tag: true },
    });
  }

  findByArticle(article_id: number) {
    return this.prisma.articleTags.findMany({
      where: { article_id: article_id },
      include: { tag: true },
    });
  }

  findByTag(tags_id: number) {
    return this.prisma.articleTags.findMany({
      where: { tag_id: tags_id },
      include: { article: true },
    });
  }

  remove(article_id: number, tag_id: number) {
    return this.prisma.articleTags.delete({
      where: { article_id_tag_id: { article_id, tag_id } },
    });
  }
}
