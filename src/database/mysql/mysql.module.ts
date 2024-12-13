import { Module } from '@nestjs/common';
import { CustomLoggerService } from 'src/common/global-config/logger/custom-logger.service';
import { Mysql2Service } from 'src/database/mysql/mysql.service';

@Module({
  providers: [Mysql2Service, CustomLoggerService],
  exports: [Mysql2Service],
})
export class Mysql2Module {}
