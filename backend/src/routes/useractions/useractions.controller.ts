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
import { UserActionsService } from './useractions.service';
import { CreateUserActionDto } from './dto/create-useraction.dto';
import { UpdateUserActionDto } from './dto/update-useraction.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('useractions')
@Controller('useractions')
export class UserActionsController {
  constructor(private readonly service: UserActionsService) {}

  @Post()
  create(@Body() dto: CreateUserActionDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserActionDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
