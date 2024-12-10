import { Module } from '@nestjs/common';
import { PointService } from 'src/domain/point/services/point.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [PointService],
  exports: [PointService],
})
export class DomainModule {}
