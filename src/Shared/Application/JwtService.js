"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../Infrastructure/env");
class JwtService {
    constructor() {
        this.secretKey = env_1.env.JWT_SECRET; // Clave secreta para el token de acceso
        this.refreshTokenSecretKey = env_1.env.JWT_REFRESH_SECRET; // Clave secreta para el token de actualización
    }
    /**
     * Genera un token de acceso JWT.
     * @param userId - ID del usuario.
     * @returns Token de acceso JWT.
     */
    generateToken(userId) {
        return jsonwebtoken_1.default.sign({ id: userId }, this.secretKey, { expiresIn: "1d" }); // Expira en 1 dia
    }
    /**
     * Genera un token de actualización JWT.
     * @param userId - ID del usuario.
     * @returns Token de actualización JWT.
     */
    generateRefreshToken(userId) {
        return jsonwebtoken_1.default.sign({ id: userId }, this.refreshTokenSecretKey, { expiresIn: "7d" }); // Expira en 7 días
    }
    /**
     * Verifica y decodifica un token de acceso JWT.
     * @param token - Token de acceso JWT.
     * @returns Payload del token (por ejemplo, el ID del usuario).
     */
    verifyToken(token) {
        try {
            const payload = jsonwebtoken_1.default.verify(token, this.secretKey);
            return payload;
        }
        catch (error) {
            return null; // El token es inválido o ha expirado
        }
    }
    /**
     * Verifica y decodifica un token de actualización JWT.
     * @param refreshToken - Token de actualización JWT.
     * @returns Payload del token (por ejemplo, el ID del usuario).
     */
    verifyRefreshToken(refreshToken) {
        try {
            const payload = jsonwebtoken_1.default.verify(refreshToken, this.refreshTokenSecretKey);
            return payload;
        }
        catch (error) {
            return null; // El token es inválido o ha expirado
        }
    }
}
exports.JwtService = JwtService;
//# sourceMappingURL=JwtService.js.map