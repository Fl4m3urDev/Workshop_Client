import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateCategoryDto } from './dto/create-categorie.dto';
import { UpdateCategoryDto } from './dto/update-categorie.dto';
import { Categories as PrismaCategory } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto): Promise<PrismaCategory> {
    return this.prisma.categories.create({ data: createCategoryDto as any });
  }

  findAll(): Promise<PrismaCategory[]> {
    return this.prisma.categories.findMany();
  }

  /** Shuffle (Fisher–Yates) — utile si tu veux renvoyer aléatoire */
  async findAllShuffle(): Promise<PrismaCategory[]> {
    const items = await this.prisma.categories.findMany();
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }

  findOne(category_id: number): Promise<PrismaCategory | null> {
    return this.prisma.categories.findUnique({ where: { category_id } });
  }

  async update(category_id: number, updateCategoryDto: UpdateCategoryDto): Promise<PrismaCategory> {
    // Optionnel : vérifier existence
    const existing = await this.prisma.categories.findUnique({ where: { category_id } });
    if (!existing) throw new NotFoundException('Category not found');
    return this.prisma.categories.update({ where: { category_id }, data: updateCategoryDto as any });
  }

  async remove(category_id: number): Promise<PrismaCategory> {
    const existing = await this.prisma.categories.findUnique({ where: { category_id } });
    if (!existing) throw new NotFoundException('Category not found');
    return this.prisma.categories.delete({ where: { category_id } });
  }
}
