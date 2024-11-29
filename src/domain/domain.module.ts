import { Module } from '@nestjs/common';
import { ProductService } from 'src/domain/services/product.service';

@Module({
  providers: [ProductService],
  exports: [ProductService],
})
export class DomainModule {}
