import { Express } from 'express';
import { bodyParser, contentType, cors } from '@/main/middlewares';

export default (app: Express): void => {
  app.use(cors);
  app.use(contentType);
  app.use(bodyParser);
};
