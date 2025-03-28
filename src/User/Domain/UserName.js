"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserName = void 0;
const UserNotFoundError_1 = require("./Exceptions/UserNotFoundError");
class UserName {
    constructor(value) {
        if (value.length < 3) {
            throw new UserNotFoundError_1.UserNotFoundError("El nombre debe tener al menos 3 caracteres.");
        }
        this.value = value;
    }
}
exports.UserName = UserName;
//# sourceMappingURL=UserName.js.map