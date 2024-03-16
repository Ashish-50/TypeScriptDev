import { Sequelize } from 'sequelize';
import { DB_HOSTNAME, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from './config/config';
const env = process.env.NODE_ENV || 'development';

if (!DB_HOSTNAME || !DB_NAME || !DB_PASSWORD || !DB_PORT || !DB_USERNAME) {
  throw new Error('Database configuration values are missing');
}

interface Database {
  sequelize: Sequelize;
}

const db: Database = {
  sequelize: new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOSTNAME,
    port: Number(DB_PORT),
    dialect: 'postgres',
  }),
};

export const sequelize: Sequelize = db.sequelize;

export const onDbReady = db.sequelize
  .sync()
  .then(() => console.log('Database connection succeeded:', DB_HOSTNAME))
  .catch(err => console.log('Error in db connection', err));

export default db;
