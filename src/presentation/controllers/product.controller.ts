import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { IProductsController } from 'src/application/interfaces/controllers/product-controller.interface';
import { ProductService } from 'src/domain/services/product.service';
import { GlobalResponse } from 'src/infrastructure/response/global-response';
import { productSwaggerConfig } from 'src/presentation/config/swagger/product.swagger';
import { SetSwagger } from 'src/presentation/decorators/swagger.decorator';

@Controller('products')
export class ProductsController implements IProductsController {
  constructor(private readonly productService: ProductService) {}

  @SetSwagger(productSwaggerConfig)
  @Get('/find-all')
  async findAll() {
    const items = await this.productService.findAll();

    return GlobalResponse.success({
      message: '상품정보 조회에 성공했습니다.',
      statusCode: 200,
      data: items,
    });
  }

  @SetSwagger(productSwaggerConfig)
  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const item = await this.productService.findOne(id);

    return GlobalResponse.success({
      message: '상품정보 조회에 성공했습니다.',
      statusCode: 200,
      data: item,
    });
  }

  @SetSwagger(productSwaggerConfig)
  @Get('/top-sales')
  async findTopSales() {
    const items = await this.productService.findTopSales();

    return GlobalResponse.success({
      message: '상품정보 조회에 성공했습니다.',
      statusCode: 200,
      data: items,
    });
  }
}
