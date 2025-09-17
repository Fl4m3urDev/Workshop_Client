import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Subscription } from '@prisma/client';

const mockCreateUser: CreateUserDto = {
  username: 'boris',
  email: 'boris@example.com',
  subscription_type: Subscription.free,
};

const mockUpdateUser: UpdateUserDto = {
  subscription_type: Subscription.subscriber,
};

const mockUser = {
  user_id: 1,
  username: 'boris',
  email: 'boris@example.com',
  subscription_type: 'free',
  created_at: new Date(),
};

const mockUsers: typeof mockUser[] = [];

const mockUsersService = {
  findAll: jest.fn(() => Promise.resolve(mockUsers)),
  create: jest.fn((createData: CreateUserDto) => Promise.resolve(mockUser)),
  update: jest.fn((id: number, updateData: UpdateUserDto) => Promise.resolve(mockUser)),
  findOne: jest.fn((id: number) => Promise.resolve(mockUser)),
  remove: jest.fn((id: number) => Promise.resolve(mockUser)),
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('findAll should return an array', async () => {
    const spy = jest.spyOn(service, 'findAll');
    await expect(controller.findAll()).resolves.toBe(mockUsers);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('create should call service.create', async () => {
    const spy = jest.spyOn(service, 'create');
    await expect(controller.create(mockCreateUser)).resolves.toBe(mockUser);
    expect(spy).toHaveBeenCalledWith(mockCreateUser);
  });

  it('findOne should call service.findOne', async () => {
    const spy = jest.spyOn(service, 'findOne');
    await expect(controller.findOne('1')).resolves.toBe(mockUser);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('update should call service.update', async () => {
    const spy = jest.spyOn(service, 'update');
    await expect(controller.update('1', mockUpdateUser)).resolves.toBe(mockUser);
    expect(spy).toHaveBeenCalledWith(1, mockUpdateUser);
  });

  it('remove should call service.remove', async () => {
    const spy = jest.spyOn(service, 'remove');
    await expect(controller.remove('1')).resolves.toBe(mockUser);
    expect(spy).toHaveBeenCalledWith(1);
  });
});
