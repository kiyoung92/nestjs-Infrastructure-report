import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'mysql2/promise';
import * as mysql from 'mysql2/promise';
import { CustomLoggerService } from 'src/common/global-config/logger/custom-logger.service';

@Injectable()
export class Mysql2Service implements OnModuleInit {
  pool: Pool;
  #host: string;
  #user: string;
  #password: string;
  #database: string;
  #port: number;
  #connectionLimit: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: CustomLoggerService,
  ) {
    this.#host = this.configService.get<string>('DATABASE_HOST');
    this.#user = this.configService.get<string>('DATABASE_USER');
    this.#password = this.configService.get<string>('DATABASE_PASSWORD');
    this.#database = this.configService.get<string>('DATABASE_NAME');
    this.#port = this.configService.get<number>('DATABASE_PORT');
    this.#connectionLimit = this.configService.get<number>(
      'DATABASE_CONNECTION_LIMIT',
    );
    this.pool = mysql.createPool({
      host: this.#host,
      user: this.#user,
      password: this.#password,
      database: this.#database,
      port: this.#port,
      connectionLimit: this.#connectionLimit,
    });
  }

  async onModuleInit() {
    await this.pool.getConnection();
    this.logger.database(
      `Connect MySQL database: ${this.configService.get<string>(
        'DATABASE_NAME',
      )}`,
    );
  }
}
