import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserInterestDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  category_id: number;
}
