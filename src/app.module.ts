import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { PresentationModule } from 'src/presentation/presentation.module';

@Module({
  imports: [CommonModule, PresentationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
