module.exports = (sequelize, DataTypes, Model) => {
  class PostTags extends Model {}
  PostTags = sequelize.define(
    "post_tags",
    {
      post_tag_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
  return PostTags;
};
