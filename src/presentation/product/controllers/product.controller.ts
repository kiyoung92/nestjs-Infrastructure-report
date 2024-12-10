import { Controller, Get, Query } from '@nestjs/common';
import { ProductFindManyUseCase } from 'src/application/product/use-cases/product-find-many.use-case';
import { ProductFindTopSalesUseCase } from 'src/application/product/use-cases/product-find-top-sales.use-case';
import { GlobalResponse } from 'src/common/responses/global-response';
import { serializationUtils } from 'src/common/utils/serialization.util';
import { ProductRequestDto } from 'src/presentation/product/dtos/product-request.dto';
import { ProductResponseDto } from 'src/presentation/product/dtos/product-response.dto';
import { IProductController } from 'src/presentation/product/interfaces/product-controller.interface';

@Controller('product')
export class ProductController implements IProductController {
  constructor(
    private readonly productFindManyUseCase: ProductFindManyUseCase,
    private readonly productFindTopSalesUseCase: ProductFindTopSalesUseCase,
  ) {}
  @Get('/find/many')
  async findMany(@Query() queryParams: ProductRequestDto) {
    const { page, sort, keyword } = queryParams;
    const useCaseResponse = await this.productFindManyUseCase.execute({
      page,
      sort,
      keyword,
    });

    return GlobalResponse.success({
      statusCode: 200,
      message: '조회가 완료되었습니다.',
      data: serializationUtils.dto({
        dto: ProductResponseDto,
        entity: useCaseResponse,
      }),
    });
  }

  // 필요 없을듯?
  @Get('/find-top-sales')
  async findTopSales() {
    const useCaseResponse = await this.productFindTopSalesUseCase.execute();

    return GlobalResponse.success({
      statusCode: 200,
      message: '조회가 완료되었습니다.',
      data: serializationUtils.dto({
        dto: ProductResponseDto,
        entity: useCaseResponse,
      }),
    });
  }
}
