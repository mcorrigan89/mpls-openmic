import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Entities } from './entity';

export const dbConnect = () => createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'openmic',
  username: 'user_openmic',
  password: 'openmic',
  // url: process.env.DATABASE_URL,
  entities: Object.keys(Entities).map(key => Entities[key]),
  synchronize: true,
  dropSchema: true,
  // logging: true,
  // cache: true
});
