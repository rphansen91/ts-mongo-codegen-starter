import { config } from 'dotenv';

config();

export const port = process.env.PORT || 8081;
export const mongo = {
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
  name: process.env.MONGO_NAME || 'test',
};
