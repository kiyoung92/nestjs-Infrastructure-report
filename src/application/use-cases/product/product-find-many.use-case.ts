import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductFindManyUseCaseParmasType } from 'src/application/use-cases/product/types/product-find-many-use-case.type';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';

@Injectable()
export class ProductFindManyUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute({ page, sort, keyword }: ProductFindManyUseCaseParmasType) {
    const limit = 20;
    const offset = (page - 1) * limit;
    const { rows, total } = await this.productRepository.findMany(
      offset,
      limit,
      sort,
      keyword,
    );
    const totalPage = Math.ceil(total[0].count / limit);

    if (page > totalPage) {
      throw new BadRequestException('페이지가 존재하지 않습니다.');
    }

    return {
      rows,
      totalPage,
      total: total[0].count,
      page,
      limit,
    };
  }
}
