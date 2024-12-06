import { GlobalResponse } from 'src/application/config/response/global-response';
import { ProductRequestDto } from 'src/presentation/dtos/product/product-request.dto';
import { ProductResponseDto } from 'src/presentation/dtos/product/product-response.dto';

export interface IProductController {
  findMany(
    query: ProductRequestDto,
  ): Promise<GlobalResponse<ProductResponseDto>>;
  findTopSales(): Promise<GlobalResponse<ProductResponseDto>>;
}
