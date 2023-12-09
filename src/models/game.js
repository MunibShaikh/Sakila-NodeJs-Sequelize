module.exports = (sequelize, DataTypes, Model) => {
  class game extends Model {}
  game = sequelize.define("game", {
    name: DataTypes.STRING,
  });
  return game;
};
