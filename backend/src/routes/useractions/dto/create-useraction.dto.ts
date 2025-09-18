import { IsEnum, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ActionType } from '@prisma/client';

export class CreateUserActionDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  article_id: number;

  @ApiProperty({ enum: ActionType, example: ActionType.like })
  @IsEnum(ActionType)
  action_type: ActionType;
}
