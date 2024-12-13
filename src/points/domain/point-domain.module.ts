import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/database/orm/drizzle.module';
import { POINT_REPOSITORY } from 'src/points/domain/repositories/constants/point-repository.constant';
import { PointService } from 'src/points/domain/services/point.service';
import { PointRepository } from 'src/points/infrastructure/repositories/point.repository';

@Module({
  imports: [DrizzleModule],
  providers: [
    PointService,
    {
      provide: POINT_REPOSITORY,
      useClass: PointRepository,
    },
  ],
  exports: [PointService],
})
export class PointDomainModule {}
