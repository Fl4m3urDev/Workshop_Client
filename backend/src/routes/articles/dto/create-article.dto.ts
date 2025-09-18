import { IsString, IsOptional, IsInt, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ example: 'Mon premier article' })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({ example: 'Contenu détaillé de l’article' })
  @IsString()
  content: string;

  @ApiProperty({ example: 'Jean Dupont', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  author?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  category_id?: number;
}
