import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Entities } from './entity';

export const dbConnect = () => createConnection({
  type: 'postgres',
  // host: '127.0.0.1',
  // port: 5432,
  // database: 'openmic',
  url: process.env.DATABASE_URL,
  entities: Object.keys(Entities).map(key => Entities[key]),
  synchronize: false,
  dropSchema: false,
  logging: false,
  cache: false
});
