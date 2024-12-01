import { Module } from '@nestjs/common';
import { UseCaseModule } from 'src/application/use-cases/use-case.module';
import { PointController } from 'src/presentation/controllers/point.controller';

@Module({
  imports: [UseCaseModule],
  controllers: [PointController],
})
export class PresentationModule {}
