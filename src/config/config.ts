import {config} from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

const envFilePath = path.join(__dirname, '../..', `.env.${process.env.NODE_ENV || 'development'}.local`);

if (fs.existsSync(envFilePath)) {
  config({ path: envFilePath });
} else {
  console.info('[Info] env file is missing! It will be used default .env, if exist.');
  config();
}

let CREDENTIAL;
if (process.env.CREDENTIAL === 'true') {
    CREDENTIAL = process.env.CREDENTIAL;
}
export const {JWT_SECRET_KEY, EXPIRY} = process.env;
export { CREDENTIAL };
export const { PORT, SECRET_KEY, ORIGIN,NODE_ENV } = process.env;
export const {DB_CONNECTION} = process.env;

export const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOSTNAME, DB_PORT } = process.env;
