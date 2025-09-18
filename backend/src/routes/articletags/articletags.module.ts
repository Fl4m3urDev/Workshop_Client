import { Module } from '@nestjs/common';
import { ArticleTagsService } from './articletags.service';
import { ArticleTagsController } from './articletags.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ArticleTagsController],
  providers: [ArticleTagsService, PrismaService],
})
export class ArticleTagsModule {}
