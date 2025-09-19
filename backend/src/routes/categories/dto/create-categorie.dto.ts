import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriesDto {
  @ApiProperty({ example: 'Sport', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  name: string;
}
