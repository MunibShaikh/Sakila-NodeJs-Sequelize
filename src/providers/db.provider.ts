import dbConfig from "../configs/db.config";

const { Sequelize } = require("sequelize");

export default class DatabaseConn {
  constructor() {}

  public async createDBConnection() {
    try {
      const sequelize = new Sequelize(
        dbConfig.database,
        dbConfig.username,
        dbConfig.password,
        {
          host: dbConfig.host,
          dialect: dbConfig.dialect,
        }
      );

      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

// export default createDBConnection;
