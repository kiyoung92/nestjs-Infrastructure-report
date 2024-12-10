import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { PointController } from 'src/presentation/point/controllers/point.controller';
import { ProductController } from 'src/presentation/product/controllers/product.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [PointController, ProductController],
})
export class PresentationModule {}
