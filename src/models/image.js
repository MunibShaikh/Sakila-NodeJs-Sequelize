module.exports = (sequelize, DataTypes, Model) => {
  class Image extends Model {}
  Image = sequelize.define("image", {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
  });
  return Image;
};
