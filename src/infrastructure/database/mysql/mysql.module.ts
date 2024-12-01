import { Module } from '@nestjs/common';
import { CustomLoggerModule } from 'src/application/config/logger/custom-logger.module';
import { Mysql2Service } from 'src/infrastructure/database/mysql/mysql.service';

@Module({
  imports: [CustomLoggerModule],
  providers: [Mysql2Service],
  exports: [Mysql2Service],
})
export class Mysql2Module {}
