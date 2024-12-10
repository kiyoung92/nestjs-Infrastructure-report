import { GlobalResponse } from 'src/common/responses/global-response';
import { ProductRequestDto } from 'src/presentation/product/dtos/product-request.dto';
import { ProductResponseDto } from 'src/presentation/product/dtos/product-response.dto';

export interface IProductController {
  findMany(
    query: ProductRequestDto,
  ): Promise<GlobalResponse<ProductResponseDto>>;
  findTopSales(): Promise<GlobalResponse<ProductResponseDto>>;
}
