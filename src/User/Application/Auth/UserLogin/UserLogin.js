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
exports.UserLogin = void 0;
const InvalidCredentialsError_1 = require("../../../Domain/Exceptions/InvalidCredentialsError");
class UserLogin {
    constructor(repository, jwtService) {
        this.repository = repository;
        this.jwtService = jwtService;
    }
    run(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Buscar al usuario por correo electrónico
            const user = yield this.repository.getByEmail(email);
            if (!user) {
                throw new InvalidCredentialsError_1.InvalidCredentialsError("El correo electrónico no está registrado.");
            }
            // Verificar la contraseña
            if (!user.password.comparePassword(password)) {
                throw new InvalidCredentialsError_1.InvalidCredentialsError("Contraseña incorrecta.");
            }
            // Generar tokens JWT
            const token = this.jwtService.generateToken(user.id.value);
            const refreshToken = this.jwtService.generateRefreshToken(user.id.value);
            return {
                user: {
                    id: user.id.value,
                    role: user.role.value, // Accede a los datos completos del rol (id, name, description)
                    name: user.name.value
                },
                token,
                refreshToken,
            };
        });
    }
}
exports.UserLogin = UserLogin;
//# sourceMappingURL=UserLogin.js.map