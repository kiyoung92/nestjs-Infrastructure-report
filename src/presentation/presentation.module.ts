import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import { OrderController } from 'src/presentation/controllers/order.controller';
import { PaymentController } from 'src/presentation/controllers/payment.controller';
import { PointController } from 'src/presentation/controllers/point.controller';
import { ProductsController } from 'src/presentation/controllers/product.controller';

@Module({
  imports: [DomainModule],
  controllers: [
    OrderController,
    PaymentController,
    ProductsController,
    PointController,
  ],
})
export class PresentationModule {}
