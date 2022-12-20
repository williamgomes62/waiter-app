import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';

import { router } from './router';

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const app = express();

    //arquivo estatico
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json()); // transforma para obj javascript
    app.use(router);

    // subindo um servidor com express
    const port = 3001;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(() => console.log('erro'));