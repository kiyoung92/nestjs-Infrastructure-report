import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/infrastructure/product/repositories/product.repository';

@Injectable()
export class ProductFindTopSalesUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute() {
    const rows = await this.productRepository.findTopSales();

    return rows;
  }
}
