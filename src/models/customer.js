module.exports = (sequelize, DataTypes, Model) => {
  class Customer extends Model {}
  Customer = sequelize.define(
    "customer",
    {
      username: DataTypes.STRING,
      points: DataTypes.INTEGER,
    },
    { timestamps: false }
  );
  return Customer;
};
