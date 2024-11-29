import { ProductResponseDto } from 'src/presentation/dtos/product/product-response.dto';

export interface IProductService {
  findAll(): Promise<ProductResponseDto[]>;
  findOne(id: number): Promise<ProductResponseDto>;
  findTopSales(): Promise<ProductResponseDto[]>;
}
