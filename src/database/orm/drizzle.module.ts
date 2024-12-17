import { Module } from '@nestjs/common';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import { DRIZZLE_PROVIDER } from 'src/database/constants/constants';
import { Mysql2Module } from 'src/database/mysql/mysql.module';
import { Mysql2Service } from 'src/database/mysql/mysql.service';
import { DrizzleLoggerModule } from 'src/database/orm/drizzle-logger.module';
import { DrizzleLoggerService } from 'src/database/orm/drizzle-logger.service';
import * as schema from 'src/database/schemas/schemas';

@Module({
  imports: [Mysql2Module, DrizzleLoggerModule],
  providers: [
    {
      provide: DRIZZLE_PROVIDER,
      inject: [Mysql2Service, DrizzleLoggerService],
      useFactory: async (
        mysql: Mysql2Service,
        logger: DrizzleLoggerService,
      ) => {
        const db = drizzle(mysql.pool, {
          mode: 'default',
          schema,
          logger,
        }) as MySql2Database<typeof schema>;

        return db;
      },
    },
  ],
  exports: [DRIZZLE_PROVIDER],
})
export class DrizzleModule {}
