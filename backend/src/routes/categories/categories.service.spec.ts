import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { PrismaService } from '../../prisma.service';
import { CreateCategoryDto } from './dto/create-categorie.dto';
import { UpdateCategoryDto } from './dto/update-categorie.dto';

const mockCreateCategory: CreateCategoryDto = { name: 'Sport' };
const mockUpdateCategory: UpdateCategoryDto = { name: 'Sports & Loisirs' };

const mockCategory = {
  category_id: 1,
  name: 'Sport',
};

const mockCategories: typeof mockCategory[] = [];

const mockPrisma = {
  categories: {
    findMany: jest.fn(() => Promise.resolve(mockCategories)),
    create: jest.fn((data) => Promise.resolve(mockCategory)),
    update: jest.fn((data) => Promise.resolve(mockCategory)),
    findUnique: jest.fn((where) => Promise.resolve(mockCategory)),
    delete: jest.fn((where) => Promise.resolve(mockCategory)),
  },
};

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prisma: typeof mockPrisma;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    prisma = module.get(PrismaService as any);
  });

  it('findAll should return an array', async () => {
    const spy = jest.spyOn(prisma.categories, 'findMany');
    await expect(service.findAll()).resolves.toBe(mockCategories);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('create should call prisma.create', async () => {
    const spy = jest.spyOn(prisma.categories, 'create');
    await expect(service.create(mockCreateCategory)).resolves.toBe(mockCategory);
    expect(spy).toHaveBeenCalledWith({ data: mockCreateCategory });
  });

  it('findOne should call prisma.findUnique', async () => {
    const spy = jest.spyOn(prisma.categories, 'findUnique');
    await expect(service.findOne(1)).resolves.toBe(mockCategory);
    expect(spy).toHaveBeenCalledWith({ where: { category_id: 1 } });
  });

  it('update should call prisma.update', async () => {
    const spy = jest.spyOn(prisma.categories, 'update');
    await expect(service.update(1, mockUpdateCategory)).resolves.toBe(mockCategory);
    expect(spy).toHaveBeenCalledWith({ where: { category_id: 1 }, data: mockUpdateCategory });
  });

  it('remove should call prisma.delete', async () => {
    const spy = jest.spyOn(prisma.categories, 'delete');
    await expect(service.remove(1)).resolves.toBe(mockCategory);
    expect(spy).toHaveBeenCalledWith({ where: { category_id: 1 } });
  });
});
