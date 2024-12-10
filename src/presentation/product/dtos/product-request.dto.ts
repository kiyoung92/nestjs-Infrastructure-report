import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class ProductRequestDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page: number;

  @IsNotEmpty()
  @IsEnum(['low_price', 'high_price', 'high_sales_volume', 'popular'], {
    message: '잘못된 요청입니다.',
  })
  @IsString()
  sort: string;

  @IsOptional()
  @IsString()
  keyword?: string;
}
