import { PartialType } from '@nestjs/swagger';
import { CreateUserInterestDto } from './create-userinterest.dto';

export class UpdateUserInterestDto extends PartialType(CreateUserInterestDto) {}
