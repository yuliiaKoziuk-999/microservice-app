import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'; // ЗМІНЕНО: тепер правильний драйвер
import { Pool } from 'pg';
import * as schema from './schema';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;
  public db: NodePgDatabase<typeof schema>;

  constructor() {
    const connectionString = process.env.DATABASE_URL!;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    this.pool = new Pool({ connectionString });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.db = drizzle(this.pool, { schema });
  }

  async onModuleInit() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await this.pool.connect();
  }

  async onModuleDestroy() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await this.pool.end();
  }
}
