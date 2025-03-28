"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLastName = void 0;
const UserNotFoundError_1 = require("./Exceptions/UserNotFoundError");
class UserLastName {
    constructor(value) {
        if (value.length < 3) {
            throw new UserNotFoundError_1.UserNotFoundError("El apellido debe tener al menos 3 caracteres.");
        }
        this.value = value;
    }
}
exports.UserLastName = UserLastName;
//# sourceMappingURL=UserLastName.js.map