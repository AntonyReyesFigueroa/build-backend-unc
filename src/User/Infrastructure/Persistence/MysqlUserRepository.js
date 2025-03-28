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
exports.MysqlUserRepository = void 0;
const promise_1 = require("mysql2/promise");
const User_1 = require("../../Domain/User");
const UserId_1 = require("../../Domain/UserId");
const UserName_1 = require("../../Domain/UserName");
const UserLastName_1 = require("../../Domain/UserLastName");
const UserEmail_1 = require("../../Domain/UserEmail");
const UserPassword_1 = require("../../Domain/UserPassword");
const UserCreatedAt_1 = require("../../Domain/UserCreatedAt");
const env_1 = require("../../../Shared/Infrastructure/env");
const UserAlreadyExistsError_1 = require("../../Domain/Exceptions/UserAlreadyExistsError");
const UserRole_1 = require("../../Domain/UserRole");
const InMemoryUserRoleRepository_1 = require("./InMemoryUserRoleRepository");
class MysqlUserRepository {
    constructor() {
        this.client = (0, promise_1.createPool)({
            host: env_1.env.DB_HOST,
            user: env_1.env.DB_USERNAME,
            password: env_1.env.DB_PASSWORD,
            database: env_1.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
        this.roleRepository = new InMemoryUserRoleRepository_1.InMemoryUserRoleRepository();
        this.ensureTableExists();
    }
    ensureTableExists() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            CREATE TABLE IF NOT EXISTS user (
                id VARCHAR(36) PRIMARY KEY,
                name VARCHAR(255),
                last_name VARCHAR(255),
                role VARCHAR(300),
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;
            yield this.client.execute(query);
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "INSERT INTO user (id, name, last_name, role, email, password, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
            try {
                yield this.client.execute(query, [
                    user.id.value,
                    user.name.value,
                    user.lastName.value,
                    user.role.value.name,
                    user.email.value,
                    user.password.value,
                    user.createdAt.value,
                ]);
            }
            catch (error) {
                if (error.code === "ER_DUP_ENTRY") {
                    // Analizar el mensaje de error para determinar el campo duplicado
                    if (error.sqlMessage.includes("for key 'user.email'")) {
                        throw new UserAlreadyExistsError_1.UserAlreadyExistsError("El correo ya está registrado.");
                    }
                    else if (error.sqlMessage.includes("for key 'user.PRIMARY'")) {
                        throw new UserAlreadyExistsError_1.UserAlreadyExistsError("El ID ya está registrado.");
                    }
                }
                throw error; // Propagar otros errores inesperados
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.client.execute("SELECT * FROM user");
            return rows.map((row) => this.mapToDomain(row));
        });
    }
    getOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.client.execute("SELECT * FROM user WHERE id = ?", [id.value]);
            if (rows.length === 0) {
                return null;
            }
            return this.mapToDomain(rows[0]);
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.client.execute("SELECT * FROM user WHERE email = ?", [email]);
            if (rows.length === 0) {
                return null;
            }
            return this.mapToDomain(rows[0]);
        });
    }
    edit(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "UPDATE user SET name = ?, last_name = ?, role = ?, email = ?, password = ? WHERE id = ?";
            yield this.client.execute(query, [
                user.name.value,
                user.lastName.value,
                user.role.value.name,
                user.email.value,
                user.password.value,
                user.id.value,
            ]);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "DELETE FROM user WHERE id = ?";
            yield this.client.execute(query, [id.value]);
        });
    }
    mapToDomain(user) {
        return new User_1.User(new UserId_1.UserId(user.id), new UserName_1.UserName(user.name), new UserLastName_1.UserLastName(user.last_name), new UserRole_1.UserRole(user.role, this.roleRepository), new UserEmail_1.UserEmail(user.email), new UserPassword_1.UserPassword(user.password, true), new UserCreatedAt_1.UserCreatedAt(user.created_at));
    }
}
exports.MysqlUserRepository = MysqlUserRepository;
//# sourceMappingURL=MysqlUserRepository.js.map