import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { PointPresentationModule } from 'src/points/presentation/point-presentation.module';

@Module({
  imports: [CommonModule, PointPresentationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
