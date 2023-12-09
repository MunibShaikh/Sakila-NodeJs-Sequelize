module.exports = (sequelize, DataTypes, Model) => {
  class PlayerGameTeam extends Model {}
  PlayerGameTeam = sequelize.define("player_game_team", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  });
  return PlayerGameTeam;
};
