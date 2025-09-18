import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ArticleTagsService } from './articletags.service';
import { CreateArticleTagDto } from './dto/create-articletag.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('article-tags')
@Controller('article-tags')
export class ArticleTagsController {
  constructor(private readonly service: ArticleTagsService) {}

  @Post()
  create(@Body() dto: CreateArticleTagDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('article/:id')
  findByArticle(@Param('id', ParseIntPipe) id: number) {
    return this.service.findByArticle(id);
  }

  @Get('tag/:id')
  findByTag(@Param('id', ParseIntPipe) id: number) {
    return this.service.findByTag(id);
  }

  @Delete(':articleId/:tagId')
  remove(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Param('tagId', ParseIntPipe) tagId: number,
  ) {
    return this.service.remove(articleId, tagId);
  }
}
