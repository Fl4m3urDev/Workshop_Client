import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserInterestsService } from './userinterests.service';
import { CreateUserInterestDto } from './dto/create-userinterest.dto';
import { UpdateUserInterestDto } from './dto/update-userinterest.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('userinterests')
@Controller('userinterests')
export class UserInterestsController {
  constructor(private readonly service: UserInterestsService) {}

  @Post()
  create(@Body() dto: CreateUserInterestDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':user_id/:category_id')
  findOne(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Param('category_id', ParseIntPipe) category_id: number,
  ) {
    return this.service.findOne(user_id, category_id);
  }

  @Patch(':user_id/:category_id')
  update(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Param('category_id', ParseIntPipe) category_id: number,
    @Body() dto: UpdateUserInterestDto,
  ) {
    return this.service.update(user_id, category_id, dto);
  }

  @Delete(':user_id/:category_id')
  remove(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Param('category_id', ParseIntPipe) category_id: number,
  ) {
    return this.service.remove(user_id, category_id);
  }
}
