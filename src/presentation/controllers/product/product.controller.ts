import { Controller, Get, Query } from '@nestjs/common';
import { GlobalResponse } from 'src/application/config/response/global-response';
import { ProductFindManyUseCase } from 'src/application/use-cases/product/product-find-many.use-case';
import { ProductFindTopSalesUseCase } from 'src/application/use-cases/product/product-find-top-sales.use-case';
import { ProductRequestDto } from 'src/presentation/dtos/product/product-request.dto';
import { ProductResponseDto } from 'src/presentation/dtos/product/product-response.dto';
import { IProductController } from 'src/presentation/interface/controllers/product-controller.interface';
import { serializationUtils } from 'src/presentation/utils/serialization.util';

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
