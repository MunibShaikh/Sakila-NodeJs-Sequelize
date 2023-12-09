import dbConfig from "../configs/db.config";

const { Sequelize, DataTypes, Model } = require("sequelize");

export default class Models {
  db: any = {};
  constructor() {}

  public async callDBConnection() {
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
      sequelize.sync({ force: false }).then(() => {
        console.log("Models Sync Successfully");
      });
      await sequelize.authenticate();
      return sequelize;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  public async getModel(modelName: string = "") {
    this.db.Sequelize = Sequelize;
    this.db.sequelize = await this.callDBConnection();
    this.db.model = await require(`../models/${modelName}`)(
      this.db.sequelize,
      DataTypes,
      Model
    );
    return this.db.model;
  }
}
