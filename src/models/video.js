module.exports = (sequelize, DataTypes, Model) => {
  class Video extends Model {}
  Video = sequelize.define("video", {
    title: DataTypes.STRING,
    text: DataTypes.STRING,
  });
  return Video;
};
