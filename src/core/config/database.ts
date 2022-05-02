import dotenv from 'dotenv';
import path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

const testDatabaseConfig = {
  schema: process.env.DB_SCHEMA,
  type: process.env.DB_TYPE as any,
  username: process.env.TEST_DB_USERNAME,
  host: process.env.TEST_DB_HOST,
  password: process.env.TEST_DB_PASSWORD,
  database: process.env.TEST_DB_DATABASE,
  port: Number(process.env.TEST_DB_PORT),
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

const devDatabaseConfig = {
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

export default process.env.ENVIRONMENT == 'test'
  ? testDatabaseConfig
  : devDatabaseConfig;
