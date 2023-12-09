module.exports = (sequelize, DataTypes, Model) => {
  class game_team extends Model {}
  game_team = sequelize.define("game_team", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  });
  return game_team;
};
