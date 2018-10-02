import http from 'http';
import { Server } from './server';

const app = new Server();
const httpServer = http.createServer(app.express);
const port = process.env.PORT || 8080;

httpServer.listen(port, (err: Error) => {
  if (err) {
    console.error(err);
    httpServer.close();
  }
  console.log(`Listening on port ${port}`);
});

httpServer.on('SIGINT', () => httpServer.close());
httpServer.on('SIGTERM', () => httpServer.close());
