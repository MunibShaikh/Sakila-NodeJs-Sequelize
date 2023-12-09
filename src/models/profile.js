module.exports = (sequelize, DataTypes, Model) => {
  class Profile extends Model {}
  Profile = sequelize.define(
    "profile",
    {
      name: DataTypes.STRING,
    },
    { timestamps: false }
  );
  return Profile;
};
