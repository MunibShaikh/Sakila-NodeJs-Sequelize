module.exports = (sequelize, DataTypes, Model) => {
  class team extends Model {}
  team = sequelize.define("team", {
    name: DataTypes.STRING,
  });
  return team;
};
