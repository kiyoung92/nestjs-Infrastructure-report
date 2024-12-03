import { Module } from '@nestjs/common';
import { UseCaseModule } from 'src/application/use-cases/use-case.module';
import { PointController } from 'src/presentation/controllers/point/point.controller';
import { ProductController } from 'src/presentation/controllers/product/product.controller';

@Module({
  imports: [UseCaseModule],
  controllers: [PointController, ProductController],
})
export class PresentationModule {}
