import { Module } from '@nestjs/common';
import { PointService } from 'src/domain/services/point/point.service';

@Module({
  providers: [PointService],
  exports: [PointService],
})
export class DomainModule {}
