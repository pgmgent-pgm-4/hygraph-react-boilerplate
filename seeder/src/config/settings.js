import path from 'path';
import dotenv from 'dotenv';

// Read all key / value pairs from .env file
dotenv.config({
  path: path.join(process.cwd(), `${process.env.NODE_ENV || 'development'}.env`),
});

const settings = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 8080,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || '24h',
  HYGRAPH_CONTENT_API: process.env.HYGRAPH_CONTENT_API,
  HYGRAPH_ASSETS_UPLOAD_API: process.env.HYGRAPH_ASSETS_UPLOAD_API,
  HYGRAPH_ACCESS_TOKEN: process.env.HYGRAPH_ACCESS_TOKEN,
};

export default settings;
