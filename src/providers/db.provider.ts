import dbConfig from "../configs/db.config";

const { Sequelize, DataTypes, Model } = require("sequelize");

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
      const db: any = {};
      db.Sequelize = Sequelize;
      db.sequelize = sequelize;
      db.users = require("../models/users")(sequelize, DataTypes, Model);
      /*
      db.sequelize.sync({ force: true, match: /-test$/ })
      {force:true} // if tables already exists than drop and create new
      but with match property it check only force:true execute for those database which
      satisfied regex
      in this code it force fully drop and create new table of those database which name ends
      with -test (eg: sakila-test)
      */
      // db.users.sync({ force: true }); -- sync single table
      db.sequelize.sync({ force: false }).then(() => {
        console.log("Models Sync Successfully");
      });
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

// export default createDBConnection;
