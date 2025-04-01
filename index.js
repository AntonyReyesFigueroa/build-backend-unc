"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ExpressUserRouter_1 = require("./src/User/Infrastructure/Controllers/ExpressUserRouter");
const env_1 = require("./src/Shared/Infrastructure/env");
const UserAlreadyExistsError_1 = require("./src/User/Domain/Exceptions/UserAlreadyExistsError");
const InvalidCredentialsError_1 = require("./src/User/Domain/Exceptions/InvalidCredentialsError");
const UserNotFoundError_1 = require("./src/User/Domain/Exceptions/UserNotFoundError");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
app.use(ExpressUserRouter_1.ExpressUserRouter);
app.use((err, _req, res, _next) => {
    console.error(err); // Registrar el error en la consola para depuración
    if (err instanceof UserNotFoundError_1.UserNotFoundError || err instanceof UserAlreadyExistsError_1.UserAlreadyExistsError || err instanceof InvalidCredentialsError_1.InvalidCredentialsError) {
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        error: "Error interno del servidor."
    });
});
app.listen(env_1.env.NODE_PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${env_1.env.NODE_PORT}`);
});
//# sourceMappingURL=index.js.map