import { Test, TestingModule } from '@nestjs/testing';
import { ArticleTagsController } from './articletags.controller';
import { ArticleTagsService } from './articletags.service';

describe('ArticleTagsController', () => {
  let controller: ArticleTagsController;
  let service: ArticleTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleTagsController],
      providers: [
        {
          provide: ArticleTagsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findByArticle: jest.fn(),
            findByTag: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ArticleTagsController>(ArticleTagsController);
    service = module.get<ArticleTagsService>(ArticleTagsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create should call service.create', async () => {
    const dto = { article_id: 1, tag_id: 2 };
    await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
