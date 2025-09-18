import { Test, TestingModule } from '@nestjs/testing';
import { UserActionsService } from './useractions.service';
import { PrismaService } from '../../prisma.service';

describe('UserActionsService', () => {
  let service: UserActionsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserActionsService,
        {
          provide: PrismaService,
          useValue: {
            userActions: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserActionsService>(UserActionsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should call prisma.userActions.create', async () => {
    const dto = { user_id: 1, article_id: 2, action_type: 'like' };
    await service.create(dto as any);
    expect(prisma.userActions.create).toHaveBeenCalledWith({ data: dto });
  });
});
