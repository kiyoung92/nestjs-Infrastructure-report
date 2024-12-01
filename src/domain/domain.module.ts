import { Module } from '@nestjs/common';
import { PointService } from 'src/domain/services/point.service';

@Module({
  providers: [PointService],
  exports: [PointService],
})
export class DomainModule {}
