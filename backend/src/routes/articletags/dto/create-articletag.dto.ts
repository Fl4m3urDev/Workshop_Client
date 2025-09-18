import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleTagDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  article_id: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  @IsNotEmpty()
  tag_id: number;
}
