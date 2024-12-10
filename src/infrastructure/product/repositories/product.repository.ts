import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { count, desc, isNull } from 'drizzle-orm';
import { IProductRepository } from 'src/domain/product/interfaces/product-repository.interface';
import { DRIZZLE_PROVIDER } from 'src/infrastructure/database/constants/constants';
import { products } from 'src/infrastructure/database/schemas/schema';
import { DrizzleORM } from 'src/infrastructure/database/types/drizzle';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly drizzle: DrizzleORM,
  ) {}
  async findMany(
    offset: number,
    limit: number,
    sort: string,
    keyword?: string,
  ) {
    try {
      const total = await this.drizzle
        .select({ count: count() })
        .from(products)
        .where(isNull(products.deletedAt));
      const rows = await this.drizzle
        .select()
        .from(products)
        .where(isNull(products.deletedAt))
        .orderBy(products.id)
        .offset(offset)
        .limit(limit);

      return {
        rows,
        total,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        '상품 조회 중 오류가 발생했습니다.',
      );
    }
  }

  async findTopSales() {
    try {
      return await this.drizzle
        .select()
        .from(products)
        .orderBy(desc(products.salesVolume))
        .where(isNull(products.deletedAt))
        .limit(10);
    } catch (error) {
      throw new InternalServerErrorException(
        '상품 조회 중 오류가 발생했습니다.',
      );
    }
  }
}
