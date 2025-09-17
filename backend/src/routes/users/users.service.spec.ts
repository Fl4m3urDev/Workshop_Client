import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
const moduleMocker = new ModuleMocker(global);

const mockCreateUser: CreateUserDto = {
  username: 'boris',
  email: 'boris@example.com',
  subscription_type: 'free',
};

const mockUpdateUser: UpdateUserDto = {
  subscription_type: 'subscriber',
};

const mockUser = {
  user_id: 1,
  username: 'boris',
  email: 'boris@example.com',
  subscription_type: 'free',
  created_at: new Date(),
};

const mockUsers: typeof mockUser[] = [];

const mockPrisma = {
  users: {
    findMany: jest.fn(() => Promise.resolve(mockUsers)),
    create: jest.fn((createData) => Promise.resolve(mockUser)),
    update: jest.fn((updateData) => Promise.resolve(mockUser)),
    findUnique: jest.fn((selectors) => Promise.resolve(mockUser)),
    delete: jest.fn((selectors) => Promise.resolve(mockUser)),
  },
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: typeof mockPrisma;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    })
      .useMocker((token) => {
        if (token === PrismaService) return mockPrisma;
        const mockMetadata = moduleMocker.getMetadata(token as any) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      })
      .compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get(PrismaService as any);
  });

  describe('FindAll', () => {
    it('should return an array of users', async () => {
      const findManySpy = jest.spyOn(prisma.users, 'findMany');
      await expect(service.findAll()).resolves.toBe(mockUsers);
      expect(findManySpy).toHaveBeenCalledTimes(1);
      expect(findManySpy).toHaveBeenCalledWith();
    });
  });

  describe('Create', () => {
    it('should return a new User', async () => {
      const createSpy = jest.spyOn(prisma.users, 'create');
      await expect(service.create(mockCreateUser)).resolves.toBe(mockUser);
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith({ data: mockCreateUser });
    });
  });

  describe('FindOne', () => {
    it('should return a User', async () => {
      const findOneSpy = jest.spyOn(prisma.users, 'findUnique');
      await expect(service.findOne(1)).resolves.toBe(mockUser);
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({ where: { user_id: 1 } });
    });
  });

  describe('Update', () => {
    it('should return an updated User', async () => {
      const updateSpy = jest.spyOn(prisma.users, 'update');
      await expect(service.update(1, mockUpdateUser)).resolves.toBe(mockUser);
      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(updateSpy).toHaveBeenCalledWith({ where: { user_id: 1 }, data: mockUpdateUser });
    });
  });

  describe('Remove', () => {
    it('should return a deleted User', async () => {
      const removeSpy = jest.spyOn(prisma.users, 'delete');
      await expect(service.remove(1)).resolves.toBe(mockUser);
      expect(removeSpy).toHaveBeenCalledTimes(1);
      expect(removeSpy).toHaveBeenCalledWith({ where: { user_id: 1 } });
    });
  });
});
