"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const UserNotFoundError_1 = require("./Exceptions/UserNotFoundError");
class UserRole {
    constructor(roleName, roleRepository) {
        this.permissions = [];
        const role = roleRepository.findByName(roleName);
        if (!role) {
            throw new UserNotFoundError_1.UserNotFoundError(`El rol ${roleName} no existe`);
        }
        this.id = role.id;
        this.name = role.name;
        this.description = role.description;
        this.permissions = role.permissions.map(permission => ({
            title: permission.title,
            functions: permission.functions.filter((func) => func !== undefined)
        }));
    }
    get value() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            permissions: this.permissions
        };
    }
}
exports.UserRole = UserRole;
//# sourceMappingURL=UserRole.js.map