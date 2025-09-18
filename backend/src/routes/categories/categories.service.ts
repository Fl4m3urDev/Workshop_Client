import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateCategoriesDto } from './dto/create-categorie.dto';
import { UpdateCategoriesDto } from './dto/update-categorie.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCategoriesDto: CreateCategoriesDto) {
    return this.prisma.categories.create({ data: createCategoriesDto });
  }

  findAll() {
    return this.prisma.categories.findMany();
  }

  /** Shuffle (Fisher–Yates) — utile si on veut renvoyer aléatoire */
  async findAllShuffle() {
    const items = await this.prisma.categories.findMany();
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }

  findOne(category_id: number) {
    return this.prisma.categories.findUnique({ where: { category_id } });
  }

  async update(category_id: number, updateCategoriesDto: UpdateCategoriesDto) {
    // Optionnel : vérifie l'existence
    const existing = await this.prisma.categories.findUnique({ where: { category_id } });
    if (!existing) throw new NotFoundException('Category not found');
    return this.prisma.categories.update({ where: { category_id }, data: updateCategoriesDto });
  }

  async remove(category_id: number) {
    const existing = await this.prisma.categories.findUnique({ where: { category_id } });
    if (!existing) throw new NotFoundException('Category not found');
    return this.prisma.categories.delete({ where: { category_id } });
  }
}
