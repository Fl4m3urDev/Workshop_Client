import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-categorie.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
