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
      db.roles = require("../models/roles")(sequelize, DataTypes, Model);
      db.posts = require("../models/posts")(sequelize, DataTypes, Model);
      db.tags = require("../models/tags")(sequelize, DataTypes, Model);
      db.postTags = require("../models/post_tags")(sequelize, DataTypes, Model);
      db.personalDetails = require("../models/personal_details")(
        sequelize,
        DataTypes,
        Model
      );
      /*
      db.sequelize.sync({ force: true, match: /-test$/ })
      {force:true} // if tables already exists than drop and create new
      but with match property it check only force:true execute for those database which
      satisfied regex
      in this code it force fully drop and create new table of those database which name ends
      with -test (eg: sakila-test)
      */
      // db.users.sync({ force: true }); -- sync single table

      // Option 1
      db.users.hasOne(db.personalDetails, { foreignKey: "user_id" });
      db.personalDetails.belongsTo(db.users, { foreignKey: "user_id" });

      db.users.hasMany(db.posts, { foreignKey: "user_id" });
      db.posts.belongsTo(db.users, { foreignKey: "user_id" });

      db.posts.belongsToMany(db.tags, {
        through: db.postTags,
        foreignKey: "post_id",
      });
      db.tags.belongsToMany(db.posts, {
        through: db.postTags,
        foreignKey: "tag_id",
      });

      db.roles.hasOne(db.users, { foreignKey: "role_id" });
      db.users.belongsTo(db.roles, { foreignKey: "role_id" });

      // # 19 M:N Association
      db.customer = require("../models/customer")(sequelize, DataTypes, Model);
      db.customerProfile = require("../models/customer_profile")(
        sequelize,
        DataTypes,
        Model
      );
      db.profile = require("../models/profile")(sequelize, DataTypes, Model);

      db.customer.belongsToMany(db.profile, { through: db.customerProfile });
      db.profile.belongsToMany(db.customer, { through: db.customerProfile });

      // #20 - Many-to-many-to-many relationships
      // Models Declaration
      db.game = require("../models/game")(sequelize, DataTypes, Model);
      db.team = require("../models/team")(sequelize, DataTypes, Model);
      db.gameTeam = require("../models/game_team")(sequelize, DataTypes, Model);

      // Relation Declaration Super Many-to-Many relationship
      db.team.belongsToMany(db.game, { through: db.gameTeam });
      db.game.belongsToMany(db.team, { through: db.gameTeam });

      db.game.hasMany(db.gameTeam);
      db.gameTeam.belongsTo(db.game);

      db.team.hasMany(db.gameTeam);
      db.gameTeam.belongsTo(db.team);

      db.player = require("../models/player")(sequelize, DataTypes, Model);

      db.playerGameTeam = require("../models/player_game_team")(
        sequelize,
        DataTypes,
        Model
      );

      db.player.belongsToMany(db.gameTeam, {
        through: db.playerGameTeam,
      });

      db.gameTeam.belongsToMany(db.player, {
        through: db.playerGameTeam,
      });

      db.player.hasMany(db.playerGameTeam);
      db.playerGameTeam.belongsTo(db.player);

      db.gameTeam.hasMany(db.playerGameTeam);
      db.playerGameTeam.belongsTo(db.gameTeam);

      db.sequelize.sync({ force: false }).then(() => {
        console.log("Models Sync Successfully");
      });
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

// export default createDBConnection;
