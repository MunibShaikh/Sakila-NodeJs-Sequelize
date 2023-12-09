import { Request, Response } from "express";
import Models from "../models";
import { ApiResponseDTO } from "../utilities/DTO/api-response.dto";
const { Sequelize, Op } = require("sequelize");

export async function getAllUsers(req: Request, res: Response) {
  try {
    const model: any = new Models();
    let users: any = await model.getModel("users");
    let _usersData = await users.findAll();
    let response = new ApiResponseDTO(true, "All users data", _usersData || []);

    res.send(response);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { first_name, last_name, role_id } = req.body;
    const model: any = new Models();
    let users: any = await model.getModel("users");
    let _createUser = await users.create({
      first_name: first_name,
      last_name: last_name,
      role_id: role_id || 0,
    });
    console.log(_createUser instanceof users);
    console.log(_createUser.first_name);
    let response = new ApiResponseDTO(true, "user created", _createUser || []);
    res.send(response);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    let userId = req.params.user_id || 0;
    const model: any = new Models();
    let users: any = await model.getModel("users");
    let _userData = await users.findOne({
      where: {
        user_id: userId,
      },
    });
    let response = new ApiResponseDTO(true, "user data", _userData || []);
    res.send(response);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
}

export async function createUsers(req: Request, res: Response) {
  try {
    const usersData = req.body;
    const model: any = new Models();
    const USERS: any = await model.getModel("users");

    if (usersData && usersData.length > 1) {
      usersData.map((x: any) => (x.full_name = ""));
      var _createUser = await USERS.bulkCreate(usersData);
    } else {
      var _createUser = await USERS.create(usersData);
    }

    let response = new ApiResponseDTO(true, "user created", _createUser || []);
    res.send(response);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    let userId = req.params.user_id || 0;
    const model: any = new Models();
    let users: any = await model.getModel("users");
    let _userData = await users.destroy({
      where: {
        user_id: userId,
      },
    });
    let response = new ApiResponseDTO(true, "user data", _userData || []);
    res.send(response);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
}

export async function patchUser(req: Request, res: Response) {
  try {
    let userId = req.params.user_id || 0;
    let userData = req.body;
    const model: any = new Models();
    let users: any = await model.getModel("users");
    let _userData = await users.update(userData, {
      where: {
        user_id: userId,
      },
    });
    let response = new ApiResponseDTO(true, "user data", _userData || []);
    res.send(response);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
}
export async function ModelQuerying(req: Request, res: Response) {
  try {
    const { caseId, searchId, searchQuery } = req.query;
    const { first_name, last_name, role_id } = req.body;
    const model: any = new Models();
    let users: any = await model.getModel("users");
    let _userData: any = {};
    switch (caseId) {
      case "1": // Insert specific column
        _userData = await users.create(
          {
            first_name: first_name,
            last_name: last_name,
            role_id: role_id,
          },
          { fields: ["first_name", "last_name"] } // role_id will not insert
        );
        break;
      case "2":
        _userData = await users.findAll({
          attributes: ["user_id", "first_name"], // select user_id,first_name only
        });
        break;
      case "3":
        _userData = await users.findAll({
          attributes: [["user_id", "id"], "first_name"], // SELECT user_id AS id, first_name FROM Users
        });
        break;
      case "4": //select first_name, count(first_name) as first_name_count from users where user_id=1
        _userData = await users.findAll({
          attributes: [
            first_name,
            [
              Sequelize.fn("COUNT", Sequelize.col("first_name")),
              "first_name_count",
            ],
          ],
          where: {
            user_id: 1,
          },
        });
        break;
      case "5":
        _userData = await users.findAll({
          where: {
            [Op.or]: [
              {
                [Op.and]: [
                  Sequelize.literal(`1=${searchId}`),
                  {
                    first_name: {
                      [Op.like]: `%${searchQuery}%`,
                    },
                  },
                ],
              },
              {
                [Op.and]: [
                  Sequelize.literal(`2=${searchId}`),
                  {
                    last_name: {
                      [Op.like]: `%${searchQuery}%`,
                    },
                  },
                ],
              },
              {
                [Op.and]: [
                  Sequelize.literal(`3=${searchId}`),
                  {
                    full_name: {
                      [Op.like]: `%${searchQuery}%`,
                    },
                  },
                ],
              },
            ],
          },
        });
        break;
      case "6":
        break;
      default:
        let test = "";
    }

    // let response = new ApiResponseDTO(true, "user data", _userData || []);
    let response = new ApiResponseDTO();
    // response.data = _userData || [];
    response.message = "data fetch";
    res.send(response);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
}
export async function ModelQueryingFinders(req: Request, res: Response) {
  try {
    const { caseId, searchId, searchQuery } = req.query;
    const { first_name, last_name, role_id } = req.body;
    let response = new ApiResponseDTO();
    const model: any = new Models();
    let users: any = await model.getModel("users");

    let _userData: any;

    switch (caseId) {
      case "1":
        _userData = await users.findByPk(2);
        break;
      case "2":
        const [user, created] = await users.findOrCreate({
          where: { first_name: "Kieron" },
          defaults: {
            last_name: "Pollard",
          },
        });
        _userData = { user, created };
        break;
      case "3":
        const { count, rows } = await users.findAndCountAll({
          where: {
            first_name: {
              [Op.like]: "Babar%",
            },
          },
          offset: 0,
          limit: 1,
        });
        _userData = { count, rows };
        break;
      case "4":
        _userData = await users.findOne({
          where: {
            user_id: 1,
          },
        });
        break;
      default:
        _userData = [];
    }

    response.data = _userData || [];
    response.message = "data fetch";

    res.send(response);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
}

export async function createUserWithDetails(req: Request, res: Response) {
  try {
    const {
      first_name,
      last_name,
      role_id,
      address,
      phone_number,
      email_address,
      country_name,
    } = req.body;

    const model: any = new Models();
    const users: any = await model.getModel("users");
    const personalDetails: any = await model.getModel("personal_details");

    let _createUser;
    let _createDetails;

    _createUser = await users.create({
      first_name: first_name,
      last_name: last_name,
      role_id: role_id || 0,
    });

    if (_createUser && _createUser?.user_id) {
      _createDetails = await personalDetails.create({
        address: address,
        phone_number: phone_number,
        email_address: email_address,
        country_name: country_name,
        user_id: _createUser.user_id,
      });
    }

    let response = new ApiResponseDTO(true, "user created", _createUser || []);
    res.send(response);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
}

export async function getAllUsersWithDetails(req: Request, res: Response) {
  try {
    // one to one
    const model: any = new Models();
    const users: any = await model.getModel("users");
    const personalDetails: any = await model.getModel("personal_details");

    users.hasOne(personalDetails, { foreignKey: "user_id" });
    personalDetails.belongsTo(users, { foreignKey: "user_id" });

    await model.callDBConnection();

    // let _usersData = await users.findAll({ include: [personalDetails] });
    let _usersData = await users.findAll({
      include: [{ model: personalDetails }],
    });
    let response = new ApiResponseDTO(true, "All users data", _usersData || []);

    res.send(response);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
}

export async function getAllUsersWithPosts(req: Request, res: Response) {
  try {
    // one to many
    const model: any = new Models();
    const users: any = await model.getModel("users");
    const posts: any = await model.getModel("posts");

    users.hasMany(posts, { foreignKey: "user_id" });
    posts.belongsTo(users, { foreignKey: "user_id" });

    await model.callDBConnection();

    let _usersData = await posts.findAll({
      include: [{ model: users }],
    });
    let response = new ApiResponseDTO(
      true,
      "All users posts",
      _usersData || []
    );

    res.send(response);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
}

export async function getAllPostsWithTags(req: Request, res: Response) {
  try {
    // many to many
    const model: any = new Models();
    const tags: any = await model.getModel("tags");
    const posts: any = await model.getModel("posts");
    // const posts: any = await model.getModel("");

    posts.belongsToMany(tags, {
      through: "post_tags",
      foreignKey: "post_id",
    });
    tags.belongsToMany(posts, {
      through: "post_tags",
      foreignKey: "tag_id",
    });

    await model.callDBConnection();

    let _usersData = await posts.findAll({
      include: [{ model: tags }],
    });

    let response = new ApiResponseDTO(
      true,
      "All users posts",
      _usersData || []
    );

    res.send(response);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
}

// ## Lazy Loading

export async function getUsersWithPostsLazyLoad(req: Request, res: Response) {
  try {
    debugger;
    // one to many
    const model: any = new Models();
    const users: any = await model.getModel("users");
    const posts: any = await model.getModel("posts");

    users.hasMany(posts, { foreignKey: "user_id" });
    posts.belongsTo(users, { foreignKey: "user_id" });

    await model.callDBConnection();
    let _postsData = await posts.findAll({
      where: {
        posts_id: 4,
      },
    });

    let userPosts = await _postsData[0].getUser();
    console.log(userPosts);

    let response = new ApiResponseDTO(true, "All users posts", userPosts || []);

    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(`Error: ${error}`);
  }
}

// # inner join advance Eager
export async function getUsersWithPostsEager(req: Request, res: Response) {
  //inner join
  try {
    debugger;
    // one to many
    const model: any = new Models();
    const users: any = await model.getModel("users");
    const posts: any = await model.getModel("posts");

    users.hasMany(posts, { foreignKey: "user_id" });
    posts.belongsTo(users, { foreignKey: "user_id" });

    await model.callDBConnection();
    // Default syntax always do left join

    // Right Join
    let _postsData = await posts.findAll({
      include: [
        {
          model: users,
          required: false,
          right: true,
        },
      ],
    });
    /*
    // inner join
    let _postsData = await posts.findAll({
      include: [
        {
          model: users,
          required: true,
        },
      ],
    });
    */

    let response = new ApiResponseDTO(
      true,
      "All users posts",
      _postsData || []
    );

    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(`Error: ${error}`);
  }
}

// multi join Eager Loading
export async function getUsersWithPostsMultiJoins(req: Request, res: Response) {
  //inner join
  try {
    debugger;
    // one to many
    const model: any = new Models();
    const users: any = await model.getModel("users");
    const posts: any = await model.getModel("posts");
    const personalDetails: any = await model.getModel("personal_details");

    users.hasOne(personalDetails, { foreignKey: "user_id" });
    personalDetails.belongsTo(users, { foreignKey: "user_id" });

    users.hasMany(posts, { foreignKey: "user_id" });
    posts.belongsTo(users, { foreignKey: "user_id" });

    await model.callDBConnection();
    let _postsData = await users.findAll({
      include: [
        {
          model: posts,
          required: false,
          right: true,
        },
        {
          model: personalDetails,
        },
      ],
    });

    let response = new ApiResponseDTO(
      true,
      "All users posts",
      _postsData || []
    );

    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(`Error: ${error}`);
  }
}

// nested join Eager Loading
export async function getUsersWithPostsNestedJoins(
  req: Request,
  res: Response
) {
  //inner join
  try {
    debugger;
    // one to many
    const model: any = new Models();
    const users: any = await model.getModel("users");
    const posts: any = await model.getModel("posts");
    const roles: any = await model.getModel("roles");
    const personalDetails: any = await model.getModel("personal_details");

    users.hasMany(posts, { foreignKey: "user_id" });
    posts.belongsTo(users, { foreignKey: "user_id" });

    // users.hasOne(roles, { foreignKey: "role_id" });
    // roles.belongsTo(users, { foreignKey: "role_id" });

    users.hasOne(personalDetails, { foreignKey: "user_id" });
    personalDetails.belongsTo(users, { foreignKey: "user_id" });

    roles.hasMany(users, { foreignKey: "role_id" });
    users.belongsTo(roles, { foreignKey: "role_id" });

    await model.callDBConnection();
    /*
    let _postsData = await roles.findAll({
      include: [
        {
          model: users,
          include: [{ model: posts, required: true }],
          required: true,
          where: {
            role_id: {
              [Op.eq]: 3, // Use Sequelize operator to match the role_id
            },
          },
        },
        // {
        //   model: personalDetails,
        // },
      ],
    });
    */

    /* let _postsData = await users.findAll({
      include: [
        {
          model: posts,
          // include: [{ model: posts, required: true }],

          required: true,
        },
        // {
        //   model: personalDetails,
        // },
      ],
      where: {
        role_id: {
          [Op.eq]: 3, // Use Sequelize operator to match the role_id
        },
      },
    });
    */

    let _postsData = await roles.findAll({
      include: [
        {
          model: users,
          include: [{ model: posts, required: true }],

          required: true,
        },
        // {
        //   model: personalDetails,
        // },
      ],
      where: {
        role_id: {
          [Op.eq]: 3, // Use Sequelize operator to match the role_id
        },
      },
    });

    let response = new ApiResponseDTO(
      true,
      "All users posts",
      _postsData || []
    );

    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(`Error: ${error}`);
  }
}

// Creating with Associations // // insert data using association
export async function createAssociation(req: Request, res: Response) {
  try {
    debugger;
    const model: any = new Models();
    const users: any = await model.getModel("users");
    const personalDetails: any = await model.getModel("personal_details");
    const roles: any = await model.getModel("roles");

    roles.hasMany(users, { foreignKey: "role_id" });
    users.belongsTo(roles, { foreignKey: "role_id" });

    users.hasMany(personalDetails, {
      foreignKey: "user_id",
    });
    const contactDetails = personalDetails.belongsTo(users, {
      foreignKey: "user_id",
      as: "users",
    });

    await model.callDBConnection();
    let _postsData: any;

    let createPayload = {
      address: "555 Riverside Avenue, Melbourne",
      phone_number: "+611234567890",
      email_address: "glenn.maxwell@example.com",
      country_name: "Australia",
      users: {
        first_name: "Glenn",
        last_name: "Maxwell",
        full_name: "",
        role_id: 2,
      },
    };

    await personalDetails.create(createPayload, { include: [contactDetails] });

    let response = new ApiResponseDTO(
      true,
      "All users posts",
      _postsData || []
    );

    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(`Error: ${error}`);
  }
}

// ## insert data into through table advance Association (#19) M:N Association
export async function insertIntoCustomerProfile(req: Request, res: Response) {
  try {
    // many to many
    const model: any = new Models();
    const customer = await model.getModel("customer");
    const profile = await model.getModel("profile");
    const customerProfile = await model.getModel("customer_profile");

    customer.belongsToMany(profile, { through: customerProfile });
    profile.belongsToMany(customer, { through: customerProfile });

    /*Using Lazy Loading - 
    const queen = await profile.create({ name: "Queen" });
    const amidala = await customer.create({ username: "p4dm3", points: 1000 });
    await amidala.addProfile(queen, { through: { selfGranted: false } });*/

    /*Using Eager Loading*/
    const amidala = await customer.create(
      {
        username: "p4dm4e",
        points: 1300,
        profiles: [
          {
            name: "king",
            customer_profile: {
              selfGranted: true,
            },
          },
        ],
      },
      {
        include: profile,
      }
    );

    const result = await customer.findOne({
      where: { username: "p4dm4e" },
      include: profile,
    });

    let response = new ApiResponseDTO(
      true,
      "through table result",
      result || []
    );

    res.send(response);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
}

// ## select rules for (#19) M:N Association
export async function selectCustomerProfile(req: Request, res: Response) {
  try {
    // many to many
    const model: any = new Models();
    const customer = await model.getModel("customer");
    const profile = await model.getModel("profile");
    const customerProfile = await model.getModel("customer_profile");

    /*
    scenario - 1
    customer.belongsToMany(profile, { through: customerProfile });
    profile.belongsToMany(customer, { through: customerProfile });

    possible query:
    let result = await customer.findAll({ include: profile });

    not possible query:
    let result = await customer.findAll({ include: customer_profile });

    get specific attribute
    let result = await customer.findOne({
      include: {
        model: profile,
        through: {
          attributes: ["selfGranted"],
        },
      },
    });


    */

    // scenario - 2
    customer.hasMany(customerProfile);
    customerProfile.belongsTo(customer);

    profile.hasMany(customerProfile);
    customerProfile.belongsTo(profile);

    //possible query:
    //let result = await customer.findAll({ include: customerProfile });

    //Not Possible Query:
    // let result = await customer.findAll({ include: profile });

    // overcome with these issues (scenario 2)
    let result = await customer.findAll({
      include: {
        model: customerProfile,
        include: profile,
      },
    });

    // ϙ also create super relation which means one to many and many to many at same time

    let response = new ApiResponseDTO(
      true,
      "through table result",
      result || []
    );

    res.send(response);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
}

// ## select rules for #20 - Many-to-many-to-many relationships
export async function selectMToNCustomerProfile(req: Request, res: Response) {
  try {
    // many to many
    const model: any = new Models();
    const Player = await model.getModel("player");
    const Game = await model.getModel("game");
    const Team = await model.getModel("team");
    const PlayerGameTeam = await model.getModel("player_game_team");
    const GameTeam = await model.getModel("game_team");

    let result = {};

    Team.belongsToMany(Game, { through: GameTeam });
    Game.belongsToMany(Team, { through: GameTeam });

    Game.hasMany(GameTeam);
    GameTeam.belongsTo(Game);

    Team.hasMany(GameTeam);
    GameTeam.belongsTo(Team);

    Player.belongsToMany(GameTeam, {
      through: PlayerGameTeam,
    });

    GameTeam.belongsToMany(Player, {
      through: PlayerGameTeam,
    });

    Player.hasMany(PlayerGameTeam);
    PlayerGameTeam.belongsTo(Player);

    GameTeam.hasMany(PlayerGameTeam);
    PlayerGameTeam.belongsTo(GameTeam);

    /*
    insert data
    await Player.bulkCreate([
      { username: "s0me0ne" },
      { username: "empty" },
      { username: "greenhead" },
      { username: "not_spock" },
      { username: "bowl_of_petunias" },
    ]);
    await Game.bulkCreate([
      { name: "The Big Clash" },
      { name: "Winter Showdown" },
      { name: "Summer Beatdown" },
    ]);
    await Team.bulkCreate([
      { name: "The Martians" },
      { name: "The Earthlings" },
      { name: "The Plutonians" },
    ]);

    await GameTeam.bulkCreate([
      { gameId: 1, teamId: 1 },
      { gameId: 1, teamId: 2 },
      { gameId: 2, teamId: 1 },
      { gameId: 2, teamId: 3 },
      { gameId: 3, teamId: 2 },
      { gameId: 3, teamId: 3 },
    ]);

    await PlayerGameTeam.bulkCreate([
      { playerId: 1, gameTeamId: 3 },
      { playerId: 3, gameTeamId: 3 },
      { playerId: 4, gameTeamId: 4 },
      { playerId: 5, gameTeamId: 4 },
    ]);
     */
    // Now we can make queries!
    const game = await Game.findOne({
      where: {
        name: "Winter Showdown",
      },
      include: {
        model: GameTeam,
        include: [
          {
            model: Player,
            through: { attributes: [] }, // Hide unwanted `PlayerGameTeam` nested object from results
          },
          Team,
        ],
      },
    });

    result = game;

    for (let i = 0; i < game.game_teams.length; i++) {
      const team = game.game_teams[i].team;
      const players = game.game_teams[i].players;
      console.log(
        `- Team "${team.name}" played game "${game.name}" with the following players:`
      );
      console.log(players.map((p: any) => `--- ${p.username}`).join("\n"));
    }

    let response = new ApiResponseDTO(
      true,
      "through table result",
      result || []
    );

    res.send(response);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
}

// ## 21- scopes
export async function scopes(req: Request, res: Response) {
  try {
    // many to many
    const model: any = new Models();
    const Player = await model.getModel("player");
    const Game = await model.getModel("game");
    const Team = await model.getModel("team");
    const PlayerGameTeam = await model.getModel("player_game_team");
    const GameTeam = await model.getModel("game_team");

    let result = {};

    Team.belongsToMany(Game, { through: GameTeam });
    Game.belongsToMany(Team, { through: GameTeam });

    Game.hasMany(GameTeam);
    GameTeam.belongsTo(Game);

    Team.hasMany(GameTeam);
    GameTeam.belongsTo(Team);

    Player.belongsToMany(GameTeam, {
      through: PlayerGameTeam,
    });

    GameTeam.belongsToMany(Player, {
      through: PlayerGameTeam,
    });

    Player.hasMany(PlayerGameTeam);
    PlayerGameTeam.belongsTo(Player);

    GameTeam.hasMany(PlayerGameTeam);
    PlayerGameTeam.belongsTo(GameTeam);

    // ## Add Scope
    Player.addScope("ActivePlayers", {
      where: {
        username: "greenhead",
      },
    });

    Player.addScope("IncludeGameTeam", {
      include: {
        model: GameTeam,
        include: {
          model: Team,
        },
      },
    });

    result = await Player.scope(["IncludeGameTeam"]).findAll({});

    let response = new ApiResponseDTO(true, "Scope result", result || []);

    res.send(response);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
}

// ## 21- transactions
export async function transaction(req: Request, res: Response) {
  try {
    debugger;
    // many to many
    const model: any = new Models();
    console.log(model.db);
    const users: any = await model.getModel("users");
    const personalDetails: any = await model.getModel("personal_details");
    const t = await model.db.sequelize.transaction();

    let _createUser;
    let _createDetails;
    let result: any = {};
    try {
      _createUser = await users.create(
        {
          first_name: "brock",
          last_name: "lesnar",
          role_id: 2,
        },
        { transaction: t }
      );

      if (_createUser && _createUser?.user_id) {
        _createDetails = await personalDetails.create(
          {
            address: "russian union street",
            phone_number: "666-777-8801",
            email_address: "brock@example.com",
            country_name: "russia",
            user_id: _createUser.user_id,
          },
          { transaction: t }
        );
      }
      result.message = "Data Inserted";
      await t.commit();
    } catch (error) {
      result.message = "Transaction Rollback: " + error;
      await t.rollback();
    }

    let response = new ApiResponseDTO(true, "Scope result", result || []);

    res.send(response);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
}
