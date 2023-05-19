import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql' as const,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['dist/**/**/entities/*.entity{.ts,.js}'],
  migrations: ['dist/databases/migrations/*{.ts,.js}'],
  migrationsRun: true,
  synchronize: false,
  dropSchema: false,
  logging: true,
} as DataSourceOptions);
