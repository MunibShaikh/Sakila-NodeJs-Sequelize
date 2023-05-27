import dotenv from "dotenv";
dotenv.config();
interface DatabaseConfig {
  database: string | undefined;
  username: string | undefined;
  password: string | undefined;
  host: string | undefined;
  dialect: string | undefined;
}

let dbConfig: DatabaseConfig;

if (process.env.NODE_ENV === "development") {
  dbConfig = {
    database: process.env.DEV_DB_NAME,
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASS,
    host: process.env.DEV_DB_HOST,
    dialect: process.env.DEV_DB_DIALECT,
  };
} else {
  dbConfig = {
    database: process.env.PROD_DB_NAME,
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASS,
    host: process.env.PROD_DB_HOST,
    dialect: process.env.PROD_DB_DIALECT,
  };
}
export default dbConfig;
