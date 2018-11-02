import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import { dbConnect } from './database';
import { schema } from './models';

export class Server {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.databaseConnection()
      .then(() => {
        this.graphQL();
      })
      .catch(err => console.error(err));
  }

  private middleware() {
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private databaseConnection = async () => {
    try {
      await dbConnect();
     } catch (err) {
      console.log(err);
      return err;
    }
  }

  private graphQL() {
    this.express.use('/graphql', graphqlHTTP({
      schema,
      graphiql: true,
      formatError: err => {
        console.error(err);
        return err;
      }
    }));
  }
}
