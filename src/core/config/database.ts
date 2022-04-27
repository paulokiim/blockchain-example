import dotenv from 'dotenv';
import path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

export default {
  schema: process.env.DB_SCHEMA,
  type: process.env.DB_TYPE as any,
  username: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  entities: [path.join(__dirname, '..', 'entity', '**', '*.*')],
  migrations: [path.join(__dirname, '..', '..', 'migrations', '**', '*.*')],
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/core/entity',
  },
  logging: false,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};
