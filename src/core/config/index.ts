import dotenv from 'dotenv';

import DATABASE_CONFIG from './database';

dotenv.config();

export default {
  PORT: Number(process.env.PORT),
  AWS_ACCESS_KEY_ID: String(process.env.AWS_ACCESS_KEY_ID),
  AWS_SECRET_ACCESS_KEY: String(process.env.AWS_SECRET_ACCESS_KEY),
  AWS_REGION: String(process.env.AWS_REGION),
  AWS_BUCKET_NAME: String(process.env.AWS_BUCKET_NAME),
  MAX_UPLOAD_SIZE: Number(process.env.MAX_UPLOAD_SIZE) || 2 * 1024 * 1024,
  DATABASE_CONFIG,
};
