module.exports = (sequelize, DataTypes, Model) => {
  class player extends Model {}
  player = sequelize.define("player", {
    username: DataTypes.STRING,
  });
  return player;
};
