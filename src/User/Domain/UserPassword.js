"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserNotFoundError_1 = require("./Exceptions/UserNotFoundError");
class UserPassword {
    constructor(value, isHashed = false) {
        if (!isHashed && value.length < 8) {
            throw new UserNotFoundError_1.UserNotFoundError("La contraseña debe tener al menos 8 caracteres.");
        }
        this.value = isHashed ? value : bcrypt_1.default.hashSync(value, 10); // Solo hashea si no está hasheado
    }
    comparePassword(password) {
        return bcrypt_1.default.compareSync(password, this.value);
    }
}
exports.UserPassword = UserPassword;
//# sourceMappingURL=UserPassword.js.map