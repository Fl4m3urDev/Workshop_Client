import { Test, TestingModule } from '@nestjs/testing';
import { UserActionsController } from './useractions.controller';
import { UserActionsService } from './useractions.service';

describe('UserActionsController', () => {
  let controller: UserActionsController;
  let service: UserActionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserActionsController],
      providers: [
        {
          provide: UserActionsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserActionsController>(UserActionsController);
    service = module.get<UserActionsService>(UserActionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create should call service.create', async () => {
    const dto = { user_id: 1, article_id: 2, action_type: 'view' };
    await controller.create(dto as any);
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
