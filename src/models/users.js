module.exports = (sequelize, DataTypes, Model) => {
  class Users extends Model {}
  Users = sequelize.define(
    "Users",
    {
      // name: DataTypes.STRING,
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      last_name: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
      full_name: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
      role_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    },
    {
      updatedAt: "updated_at",
      createdAt: "created_at",
    }

    // {
    //tableName: "UserData", if update table name but it works with force:true
    //timestamps:false   //column not create updatedAt, createdAt both
    /*
    or column not create individual level
    updatedAt:false,
    createdAt:false
   */
    /*
   rename table name
   updatedAt:'updated_At'
   createdAt:'created_At'
   */
    //engine:'MYISAM' // change engine name
    // }
  );
  return Users;
};
