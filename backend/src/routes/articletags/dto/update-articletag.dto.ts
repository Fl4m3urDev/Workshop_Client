import { PartialType } from '@nestjs/swagger';
import { CreateArticleTagDto } from './create-articletag.dto';

export class UpdateArticleTagDto extends PartialType(CreateArticleTagDto) {}
