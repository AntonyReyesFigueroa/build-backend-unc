"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleGetAll = void 0;
class UserRoleGetAll {
    constructor(repository) {
        this.repository = repository;
    }
    run() {
        return this.repository.getAllRoles();
    }
}
exports.UserRoleGetAll = UserRoleGetAll;
//# sourceMappingURL=UserRoleGetAll.js.map