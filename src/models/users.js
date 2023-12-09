module.exports = (sequelize, DataTypes, Model) => {
  class Users extends Model {}
  Users = sequelize.define(
    "users",
    {
      // name: DataTypes.STRING,
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        get() {
          const rawValue = this.getDataValue("first_name");
          return rawValue ? rawValue.toUpperCase() : null;
        },
        set(value) {
          value
            .split("")
            .map(
              (element, index) =>
                (element = index == 0 ? element.toUpperCase() : element)
            )
            .join("");
          this.setDataValue("first_name", value);
        },
      },
      last_name: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        set(value) {
          if (this.last_name) {
            value = this.first_name + " " + this.last_name;
          } else {
            value = this.first_name;
          }
          this.setDataValue("full_name", value);
        },
      },

      formal_name: {
        type: DataTypes.VIRTUAL,
        get() {
          return `Mr. ${this.getDataValue("first_name")} ${this.getDataValue(
            "last_name"
          )}`;
        },
        set(value) {
          throw new Error("Do not try to set the `fullName` value!");
        },
      },

      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "roles",
          key: "role_id",
        },
        allowNull: true,
        // defaultValue: 1,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        // , allowNull: false
        defaultValue: 1,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        // allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
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
