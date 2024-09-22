module.exports = (sequelize, DataTypes, Model) => {
  class Comment extends Model {}
  Comment = sequelize.define("comment", {
    title: DataTypes.STRING,
    commentableId: DataTypes.INTEGER,
    commentableType: DataTypes.STRING,
  });
  return Comment;
};
