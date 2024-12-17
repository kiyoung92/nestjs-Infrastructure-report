import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_PROVIDER } from 'src/database/constants/constants';
import { DrizzleORM, DrizzleTransaction } from 'src/database/types/drizzle';

@Injectable()
export class RepositoryManager {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    readonly drizzle: DrizzleORM,
  ) {}

  async transaction<T>(
    callback: (tx: DrizzleTransaction) => Promise<T>,
  ): Promise<T> {
    return await this.drizzle.transaction(callback);
  }
}
