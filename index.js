import dotenv from 'dotenv';
import { app } from './app.js';
import Connect from './db/index.js';
import cron from 'node-cron';

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  Connect();

  cron.schedule('0 * * * *', () => {
    console.log('Hourly task running:', new Date());
  });
});
