module.exports = (sequelize, DataTypes, Model) => {
  class Tags extends Model {}
  Tags = sequelize.define(
    "Tags",
    {
      tags_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 1 },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );
  return Tags;
};
