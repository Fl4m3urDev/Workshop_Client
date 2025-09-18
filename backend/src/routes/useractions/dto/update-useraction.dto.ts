import { PartialType } from '@nestjs/swagger';
import { CreateUserActionDto } from './create-useraction.dto';

export class UpdateUserActionDto extends PartialType(CreateUserActionDto) {}
