module.exports = (sequelize, DataTypes, Model) => {
  class Posts extends Model {}
  Posts = sequelize.define(
    "posts",
    {
      posts_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      content: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 1 },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );
  return Posts;
};
