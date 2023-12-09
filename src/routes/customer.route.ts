import { Router } from "express";
import {
  ModelQuerying,
  ModelQueryingFinders,
  createAssociation,
  createUser,
  createUserWithDetails,
  createUsers,
  deleteUser,
  getAllPostsWithTags,
  getAllUsers,
  getAllUsersWithDetails,
  getAllUsersWithPosts,
  getUser,
  getUsersWithPostsEager,
  getUsersWithPostsLazyLoad,
  getUsersWithPostsMultiJoins,
  getUsersWithPostsNestedJoins,
  insertIntoCustomerProfile,
  patchUser,
  scopes,
  selectCustomerProfile,
  selectMToNCustomerProfile,
  transaction,
} from "../controllers/customer.controller";
import routeConfig from "../configs/routes.config";
const routePath = routeConfig.routePath.customer;
// const customerRoutes = Router();
// customerRoutes.get("/", getAllCustomers);

const customerRoutes = (router: Router) => {
  router.get(`${routePath}/getAllUsers`, getAllUsers);
  router.get(`${routePath}/getUser/:user_id?`, getUser);
  router.post(`${routePath}/createUser`, createUser);
  router.post(`${routePath}/createUsers`, createUsers);
  router.delete(`${routePath}/deleteUser/:user_id?`, deleteUser);
  router.patch(`${routePath}/patchUser/:user_id?`, patchUser);
  router.post(`${routePath}/ModelQuerying`, ModelQuerying);
  router.post(`${routePath}/ModelQueryingFinders`, ModelQueryingFinders);
  router.post(`${routePath}/createUserWithDetails`, createUserWithDetails);
  router.get(`${routePath}/getAllUsersWithDetails`, getAllUsersWithDetails); // one to one
  router.get(`${routePath}/getAllUsersWithPosts`, getAllUsersWithPosts); //one to many
  router.get(`${routePath}/getAllPostsWithTags`, getAllPostsWithTags); //many to many
  router.get(
    `${routePath}/getUsersWithPostsLazyLoad`,
    getUsersWithPostsLazyLoad
  ); // lazy loading
  router.get(`${routePath}/getUsersWithPostsEager`, getUsersWithPostsEager); // egar loading inner join
  router.get(
    `${routePath}/getUsersWithPostsMultiJoins`,
    getUsersWithPostsMultiJoins
  ); // egar loading multi inner join
  router.get(
    `${routePath}/getUsersWithPostsNestedJoins`,
    getUsersWithPostsNestedJoins
  ); // egar loading nested inner join
  router.get(`${routePath}/createAssociation`, createAssociation); // insert data using association
  // ## insert data into through table advance Association (#19) M:N Association
  router.get(
    `${routePath}/insertIntoCustomerProfile`,
    insertIntoCustomerProfile
  );
  // ## select rules for (#19) M:N Association
  router.get(`${routePath}/selectCustomerProfile`, selectCustomerProfile);

  // ## select rules for (#19) M:N Association
  router.get(
    `${routePath}/selectMToNCustomerProfile`,
    selectMToNCustomerProfile
  );

  // ## 21 - Scopes
  router.get(`${routePath}/scopes`, scopes);
  // ## 22 - transaction
  router.get(`${routePath}/transaction`, transaction);
};

export default customerRoutes;
