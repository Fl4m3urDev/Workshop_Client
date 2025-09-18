import { Module } from '@nestjs/common';
import { UserActionsService } from './useractions.service';
import { UserActionsController } from './useractions.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserActionsController],
  providers: [UserActionsService, PrismaService],
})
export class UserActionsModule {}
