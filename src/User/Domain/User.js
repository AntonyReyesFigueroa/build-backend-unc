"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, lastName, role, email, password, createdAt) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.role = role;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
    }
    mapToPrimitives() {
        return {
            id: this.id.value,
            name: this.name.value,
            lastName: this.lastName.value,
            role: this.role.value,
            email: this.email.value,
            createdAt: this.createdAt.value,
        };
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map