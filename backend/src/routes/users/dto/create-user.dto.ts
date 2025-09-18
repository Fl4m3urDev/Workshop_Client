import { IsEmail, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Subscription } from '@prisma/client';

export enum SubscriptionType {
  FREE = 'free',
  SUBSCRIBER = 'subscriber',
}

export class CreateUserDto {
  @ApiProperty({ example: 'alice', maxLength: 100 })
  @IsString()
  @MaxLength(100)
  username: string;

  @ApiPropertyOptional({ example: 'alice@example.com', maxLength: 150 })
  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  email?: string;

  @ApiPropertyOptional({ example: 'jeanjean', maxLength: 150 })
  @IsString()
  @MaxLength(150)
  password: string;

  @ApiPropertyOptional({ enum: SubscriptionType, example: SubscriptionType.FREE })
  @IsOptional()
  @IsEnum(SubscriptionType)
  subscription_type?: Subscription;;
}
