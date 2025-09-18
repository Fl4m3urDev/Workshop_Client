import { PartialType } from '@nestjs/swagger';
import { CreateCategoriesDto } from './create-categorie.dto';

export class UpdateCategoriesDto extends PartialType(CreateCategoriesDto) {}
