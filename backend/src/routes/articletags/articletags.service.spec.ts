// articletags.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ArticleTagsService } from './articletags.service';
import { PrismaService } from '../../prisma.service';

describe('ArticleTagsService', () => {
  let service: ArticleTagsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleTagsService,
        {
          provide: PrismaService,
          useValue: {
            articleTags: {
              create: jest.fn(),
              findMany: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ArticleTagsService>(ArticleTagsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should call prisma.articleTags.create', async () => {
    const dto = { article_id: 1, tag_id: 2 };
    await service.create(dto);
    expect(prisma.articleTags.create).toHaveBeenCalledWith({ data: dto });
  });
});
