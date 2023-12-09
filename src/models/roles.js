module.exports = (sequelize, DataTypes, Model) => {
  class Roles extends Model {}
  Roles = sequelize.define(
    "roles",
    {
      // name: DataTypes.STRING,
      role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role_title: {
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
  return Roles;
};
