import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Sport', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  name: string;
}
