"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceContainer = void 0;
const UserCreate_1 = require("../../User/Application/UserCreate/UserCreate");
const UserLogin_1 = require("../../User/Application/Auth/UserLogin/UserLogin");
const UserDelete_1 = require("../../User/Application/UserDelete/UserDelete");
const UserGetAll_1 = require("../../User/Application/UserGetAll/UserGetAll");
const UserGetOneById_1 = require("../../User/Application/UserGetOneById/UserGetOneById");
const UserLogout_1 = require("../../User/Application/Auth/UserLogout/UserLogout");
const UserEdit_1 = require("../../User/Application/UserEdit/UserEdit");
const JwtService_1 = require("../Application/JwtService");
const UserPartialEdit_1 = require("../../User/Application/UserPartialEdit/UserPartialEdit");
const UserRoleGetAll_1 = require("../../User/Application/UserRolGetAll/UserRoleGetAll");
const InMemoryUserRoleRepository_1 = require("../../User/Infrastructure/Persistence/InMemoryUserRoleRepository");
const SqlServerUserRepository_1 = require("../../User/Infrastructure/Persistence/SqlServerUserRepository");
const userRepository = new SqlServerUserRepository_1.SqlServerUserRepository();
const userRoleRepository = new InMemoryUserRoleRepository_1.InMemoryUserRoleRepository();
exports.ServiceContainer = {
    user: {
        create: new UserCreate_1.UserCreate(userRepository),
        login: new UserLogin_1.UserLogin(new SqlServerUserRepository_1.SqlServerUserRepository(), new JwtService_1.JwtService()),
        edit: new UserEdit_1.UserEdit(userRepository),
        delete: new UserDelete_1.UserDelete(userRepository),
        getAll: new UserGetAll_1.UserGetAll(userRepository),
        getOneById: new UserGetOneById_1.UserGetOneById(userRepository),
        logout: new UserLogout_1.UserLogout(),
        partialEdit: new UserPartialEdit_1.UserPartialEdit(new SqlServerUserRepository_1.SqlServerUserRepository())
    },
    role: {
        getAll: new UserRoleGetAll_1.UserRoleGetAll(userRoleRepository)
    }
};
//# sourceMappingURL=UserServiceContainer.js.map