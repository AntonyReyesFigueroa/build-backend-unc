"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmail = void 0;
const UserNotFoundError_1 = require("./Exceptions/UserNotFoundError");
class UserEmail {
    constructor(value) {
        const trimmedValue = value.trim();
        if (!this.isValidEmail(trimmedValue)) {
            throw new UserNotFoundError_1.UserNotFoundError("El email debe tener un formato válido.");
        }
        this.value = trimmedValue;
    }
    isValidEmail(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }
}
exports.UserEmail = UserEmail;
//# sourceMappingURL=UserEmail.js.map