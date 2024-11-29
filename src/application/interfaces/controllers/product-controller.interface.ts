import { GlobalResponse } from 'src/infrastructure/response/global-response';
import { ProductResponseDto } from 'src/presentation/dtos/product/product-response.dto';

export interface IProductsController {
  findAll(): Promise<GlobalResponse<ProductResponseDto[]>>;
  findOne(id: number): Promise<GlobalResponse<ProductResponseDto>>;
  findTopSales(): Promise<GlobalResponse<ProductResponseDto[]>>;
}
