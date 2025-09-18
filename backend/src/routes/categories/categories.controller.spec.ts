import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-categorie.dto';
import { UpdateCategoryDto } from './dto/update-categorie.dto';

const mockCreateCategory: CreateCategoryDto = { name: 'Sport' };
const mockUpdateCategory: UpdateCategoryDto = { name: 'Sports & Loisirs' };

const mockCategory = {
  category_id: 1,
  name: 'Sport',
};

const mockCategories: typeof mockCategory[] = [];

const mockCategoriesService = {
  findAll: jest.fn(() => Promise.resolve(mockCategories)),
  create: jest.fn((d: CreateCategoryDto) => Promise.resolve(mockCategory)),
  update: jest.fn((category_id: number, d: UpdateCategoryDto) => Promise.resolve(mockCategory)),
  findOne: jest.fn((category_id: number) => Promise.resolve(mockCategory)),
  remove: jest.fn((category_id: number) => Promise.resolve(mockCategory)),
};

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [{ provide: CategoriesService, useValue: mockCategoriesService }],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('findAll should return an array', async () => {
    const spy = jest.spyOn(service, 'findAll');
    await expect(controller.findAll()).resolves.toBe(mockCategories);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('create should call service.create', async () => {
    const spy = jest.spyOn(service, 'create');
    await expect(controller.create(mockCreateCategory)).resolves.toBe(mockCategory);
    expect(spy).toHaveBeenCalledWith(mockCreateCategory);
  });

  it('findOne should call service.findOne', async () => {
    const spy = jest.spyOn(service, 'findOne');
    await expect(controller.findOne('1')).resolves.toBe(mockCategory);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('update should call service.update', async () => {
    const spy = jest.spyOn(service, 'update');
    await expect(controller.update('1', mockUpdateCategory)).resolves.toBe(mockCategory);
    expect(spy).toHaveBeenCalledWith(1, mockUpdateCategory);
  });

  it('remove should call service.remove', async () => {
    const spy = jest.spyOn(service, 'remove');
    await expect(controller.remove('1')).resolves.toBe(mockCategory);
    expect(spy).toHaveBeenCalledWith(1);
  });
});
