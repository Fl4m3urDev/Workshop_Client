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
  login(@Session() session: SessionExpress) {
    return this.usersService.login(session);
  }

  @Get()
  @ApiOkResponse({ type: User })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('shuffle')
  @ApiOkResponse({ type: User })
  findAllShuffle() {
    return this.usersService.findAllShuffle();
  }

  @Get('asyncForEach')
  @ApiOkResponse({ type: User })
  findAllAsyncForEach() {
    return this.usersService.findAllAsyncForEach();
  }

  @Get('admin')
  @Authorize([Roles.Admin])
  admin() {
    return this.usersService.admin();
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

  @Get('pdfClass/:id')
  async printPDFFromClass(@Param('id') id: string, @Res() res: Response) {
    const buffer = await this.usersService.printPDFFromClass(+id);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }

  @Get('pdfTemplate/:id')
  async printPDFFromTemplate(@Param('id') id: string, @Res() res: Response) {
    const buffer = await this.usersService.printPDFFromTemplate(+id);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
