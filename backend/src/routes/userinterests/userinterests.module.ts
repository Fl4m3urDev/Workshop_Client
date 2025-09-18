import { Module } from '@nestjs/common';
import { UserInterestsService } from './userinterests.service';
import { UserInterestsController } from './userinterests.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserInterestsController],
  providers: [UserInterestsService, PrismaService],
})
export class UserInterestsModule {}
