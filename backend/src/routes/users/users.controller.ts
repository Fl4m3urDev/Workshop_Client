import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Session } from '@nestjs/common';
import { Session as SessionExpress } from 'express-session';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { Authorize } from 'src/decorators/authorize.decorator';
import { Roles } from 'src/guards/is-authorized/roles';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOkResponse({ type: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  @ApiOkResponse()
  async login(
    @Session() session: SessionExpress,
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    return this.usersService.login(session, email, password);
  }

  @Get()
  @ApiOkResponse({ type: User })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('asyncForEach')
  @ApiOkResponse({ type: User })
  findAllAsyncForEach() {
    return this.usersService.findAllAsyncForEach();
  }

  @Get('crypto')
  crypto() {
    return this.usersService.crypto();
  }

  @Post('sendMail')
  sendMail() {
    return this.usersService.sendMail();
  }

  @Get(':id')
  @ApiOkResponse({ type: User })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: User })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: User })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
