"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEdit = void 0;
const User_1 = require("../../Domain/User");
const UserId_1 = require("../../Domain/UserId");
const UserName_1 = require("../../Domain/UserName");
const UserLastName_1 = require("../../Domain/UserLastName");
const UserEmail_1 = require("../../Domain/UserEmail");
const UserPassword_1 = require("../../Domain/UserPassword");
const UserNotFoundError_1 = require("../../Domain/Exceptions/UserNotFoundError");
const UserRole_1 = require("../../Domain/UserRole");
const InMemoryUserRoleRepository_1 = require("../../Infrastructure/Persistence/InMemoryUserRoleRepository");
class UserEdit {
    constructor(repository) {
        this.repository = repository;
        this.roleRepository = new InMemoryUserRoleRepository_1.InMemoryUserRoleRepository();
    }
    run(id, name, lastName, email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            // Buscar usuario por ID
            const existingUser = yield this.repository.getOneById(new UserId_1.UserId(id));
            if (!existingUser) {
                throw new UserNotFoundError_1.UserNotFoundError();
            }
            // Validar el rol
            const userRole = new UserRole_1.UserRole(role, this.roleRepository);
            // Actualizar datos del usuario
            const updatedUser = new User_1.User(existingUser.id, new UserName_1.UserName(name), new UserLastName_1.UserLastName(lastName), userRole, new UserEmail_1.UserEmail(email), new UserPassword_1.UserPassword(password), existingUser.createdAt);
            // Guardar cambios en el repositorio
            yield this.repository.edit(updatedUser);
        });
    }
}
exports.UserEdit = UserEdit;
//# sourceMappingURL=UserEdit.js.map