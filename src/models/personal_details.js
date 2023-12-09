module.exports = (sequelize, DataTypes, Model) => {
  class PersonalDetails extends Model {}
  PersonalDetails = sequelize.define(
    "personal_details",
    {
      personal_detail_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        // defaultValue: "",
        unique: true,
      },
      email_address: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        unique: true,
      },

      country_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "user_id",
        },
        allowNull: true,
      },
      is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 1 },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
    },
    { updatedAt: "updated_at", createdAt: "created_at" }
  );

  PersonalDetails.beforeValidate((data, options) => {
    data.country_name = data.country_name.toUpperCase();
  });

  return PersonalDetails;
};
