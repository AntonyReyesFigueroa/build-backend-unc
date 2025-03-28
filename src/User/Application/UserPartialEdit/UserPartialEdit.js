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
exports.UserPartialEdit = void 0;
const UserId_1 = require("../../Domain/UserId");
const UserNotFoundError_1 = require("../../Domain/Exceptions/UserNotFoundError");
const UserName_1 = require("../../Domain/UserName");
const UserLastName_1 = require("../../Domain/UserLastName");
const UserEmail_1 = require("../../Domain/UserEmail");
const UserPassword_1 = require("../../Domain/UserPassword");
const InMemoryUserRoleRepository_1 = require("../../Infrastructure/Persistence/InMemoryUserRoleRepository");
const UserRole_1 = require("../../Domain/UserRole");
class UserPartialEdit {
    constructor(repository) {
        this.repository = repository;
        this.roleRepository = new InMemoryUserRoleRepository_1.InMemoryUserRoleRepository();
    }
    run(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            // Buscar al usuario por ID
            const user = yield this.repository.getOneById(new UserId_1.UserId(id));
            if (!user) {
                throw new UserNotFoundError_1.UserNotFoundError();
            }
            // Aplicar los cambios proporcionados
            if (updates.name !== undefined)
                user.name = new UserName_1.UserName(updates.name);
            if (updates.lastName !== undefined)
                user.lastName = new UserLastName_1.UserLastName(updates.lastName);
            if (updates.email !== undefined)
                user.email = new UserEmail_1.UserEmail(updates.email);
            if (updates.password !== undefined)
                user.password = new UserPassword_1.UserPassword(updates.password);
            if (updates.role !== undefined) {
                const userRole = new UserRole_1.UserRole(updates.role, this.roleRepository); // Validar y crear el nuevo rol
                user.role = userRole; // Actualizar el rol del usuario
            }
            // Guardar los cambios en el repositorio
            yield this.repository.edit(user);
        });
    }
}
exports.UserPartialEdit = UserPartialEdit;
//# sourceMappingURL=UserPartialEdit.js.map