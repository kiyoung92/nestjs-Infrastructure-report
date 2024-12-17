import { Module } from '@nestjs/common';
import { PointApplicationModule } from 'src/points/application/point-application.module';
import { PointController } from 'src/points/presentation/controllers/point.contoller';

@Module({
  imports: [PointApplicationModule],
  controllers: [PointController],
})
export class PointPresentationModule {}
