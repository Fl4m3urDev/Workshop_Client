import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto/create-categorie.dto';
import { UpdateCategoriesDto } from './dto/update-categorie.dto';
import { Category } from './entities/categorie.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOkResponse({ type: Category })
  create(@Body() createCategoryDto: CreateCategoriesDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOkResponse({ type: Category, isArray: true })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':category_id')
  @ApiOkResponse({ type: Category })
  findOne(@Param('category_id') category_id: string) {
    return this.categoriesService.findOne(+category_id);
  }

  @Patch(':category_id')
  @ApiOkResponse({ type: Category })
  update(@Param('category_id') category_id: string, @Body() updateCategoryDto: UpdateCategoriesDto) {
    return this.categoriesService.update(+category_id, updateCategoryDto);
  }

  @Delete(':category_id')
  @ApiOkResponse({ type: Category })
  remove(@Param('category_id') category_id: string) {
    return this.categoriesService.remove(+category_id);
  }
}
