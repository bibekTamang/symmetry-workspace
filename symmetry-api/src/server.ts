import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { env } from './config/env';

const PORT: number = parseInt(process.env.PORT || '3000', 10);
const ENV: string = env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`Server is running in ${ENV} mode on port ${PORT}`);
});