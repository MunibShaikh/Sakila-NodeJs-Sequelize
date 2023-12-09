module.exports = (sequelize, DataTypes, Model) => {
  class Customer_Profile extends Model {}
  Customer_Profile = sequelize.define(
    "customer_profile",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      selfGranted: DataTypes.BOOLEAN,
    },
    { timestamps: false }
  );
  return Customer_Profile;
};
