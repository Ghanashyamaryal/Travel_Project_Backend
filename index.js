import dotenv from 'dotenv';
import { app } from './app.js';
import Connect from './db/index.js';

dotenv.config();


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  Connect();
});
