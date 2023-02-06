import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';
import http from 'node:http';
import * as dotenv from 'dotenv';
dotenv.config();
import { Server } from 'socket.io';
import { router } from './router';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

const MONGO_URL =
  process.env.PROD_ENV === 'true' ? (
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@containers-us-west-146.railway.app:${process.env.DB_PORT}`
  ) : 'mongodb://localhost:27017';

mongoose.connect(MONGO_URL)
  .then(() => {

    //Configurações do cors
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });

    //arquivo estatico
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json()); // transforma para obj javascript
    app.use(router);

    // subindo um servidor com express
    const port = process.env.PORT;
    server.listen(port, () => {
      const message =
        process.env.PROD_ENV === 'true' ? (
          'Server is running in production environment'
        ) : `Server is running on http://localhost:${port}`;
      console.log(message);
    });
  })
  .catch(() => console.log('error => mongoose conection'));