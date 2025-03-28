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
exports.SqlServerUserRepository = void 0;
const mssql_1 = require("mssql");
const User_1 = require("../../Domain/User");
const UserId_1 = require("../../Domain/UserId");
const UserName_1 = require("../../Domain/UserName");
const UserLastName_1 = require("../../Domain/UserLastName");
const UserRole_1 = require("../../Domain/UserRole");
const UserEmail_1 = require("../../Domain/UserEmail");
const UserPassword_1 = require("../../Domain/UserPassword");
const UserCreatedAt_1 = require("../../Domain/UserCreatedAt");
const env_1 = require("../../../Shared/Infrastructure/env");
const UserAlreadyExistsError_1 = require("../../Domain/Exceptions/UserAlreadyExistsError");
const InMemoryUserRoleRepository_1 = require("./InMemoryUserRoleRepository");
class SqlServerUserRepository {
    constructor() {
        this.roleRepository = new InMemoryUserRoleRepository_1.InMemoryUserRoleRepository();
        this.initialize().catch((error) => {
            console.error("❌ Error durante la inicialización:", error);
            throw error;
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ensureDatabaseExists();
                yield this.connectToDatabase();
                yield this.ensureTableExists();
                yield this.insertDefaultUser();
            }
            catch (error) {
                console.error("❌ Error durante la inicialización:", error);
                throw error;
            }
        });
    }
    ensureDatabaseExists() {
        return __awaiter(this, void 0, void 0, function* () {
            const tempPool = new mssql_1.ConnectionPool({
                user: env_1.env.DB_USERNAME,
                password: env_1.env.DB_PASSWORD,
                server: env_1.env.DB_HOST,
                options: {
                    encrypt: true,
                    trustServerCertificate: true,
                },
            });
            try {
                yield tempPool.connect();
                const checkDbQuery = `
                IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = '${env_1.env.DB_NAME}')
                CREATE DATABASE [${env_1.env.DB_NAME}]
            `;
                yield tempPool.request().query(checkDbQuery);
                console.log(`✅ Base de datos '${env_1.env.DB_NAME}' verificada o creada.`);
            }
            catch (error) {
                console.error("❌ Error al verificar/crear la base de datos:", error);
                throw error;
            }
            finally {
                yield tempPool.close();
            }
        });
    }
    connectToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConfig = {
                user: env_1.env.DB_USERNAME,
                password: env_1.env.DB_PASSWORD,
                server: env_1.env.DB_HOST,
                database: env_1.env.DB_NAME,
                options: {
                    encrypt: true,
                    trustServerCertificate: true,
                    requestTimeout: 30000,
                },
            };
            try {
                this.pool = new mssql_1.ConnectionPool(dbConfig);
                yield this.pool.connect();
                console.log(`✅ Conectado a la base de datos '${env_1.env.DB_NAME}'.`);
            }
            catch (error) {
                console.error("❌ Error al conectar a la base de datos:", error);
                throw error;
            }
        });
    }
    ensureTableExists() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'user')
            BEGIN
                CREATE TABLE [user] (
                    id NVARCHAR(36) PRIMARY KEY,
                    name NVARCHAR(255),
                    last_name NVARCHAR(255),
                    role NVARCHAR(300),
                    email NVARCHAR(255) UNIQUE NOT NULL,
                    password NVARCHAR(255) NOT NULL,
                    created_at DATETIME DEFAULT GETDATE()
                )
            END
        `;
            try {
                yield this.pool.request().query(query);
                console.log("✅ Tabla '[user]' verificada o creada.");
            }
            catch (error) {
                console.error("❌ Error al verificar/crear la tabla '[user]':", error);
                throw error;
            }
        });
    }
    insertDefaultUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const checkQuery = "SELECT COUNT(*) as count FROM [user]";
            const result = yield this.pool.request().query(checkQuery);
            if (result.recordset[0].count === 0) {
                const insertQuery = `
                INSERT INTO [user] (id, name, last_name, role, email, password, created_at) 
                VALUES (
                    '7e1f0424-b2c8-4921-8967-9e3b19b6240f',
                    'Antony',
                    'Reyes',
                    'Administrador',
                    'antony1@gmail.com',
                    '$2b$10$MDVoJ2dbd9E8VBruXtJnCOPQQVKgPMtCOL.FNDhQGGF1kgPRvDBWO',
                    '2025-03-24 05:30:59.013'
                )
            `;
                try {
                    yield this.pool.request().query(insertQuery);
                    console.log("✅ Usuario por defecto insertado en la tabla '[user]'.");
                }
                catch (error) {
                    console.error("❌ Error al insertar el usuario por defecto:", error);
                    throw error;
                }
            }
            else {
                console.log("✅ La tabla '[user]' ya contiene datos, no se insertó el usuario por defecto.");
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO [user] (id, name, last_name, role, email, password, created_at)
            VALUES (@id, @name, @last_name, @role, @email, @password, @created_at)
        `;
            try {
                yield this.pool
                    .request()
                    .input("id", user.id.value)
                    .input("name", user.name.value)
                    .input("last_name", user.lastName.value)
                    .input("role", user.role.value.name)
                    .input("email", user.email.value)
                    .input("password", user.password.value)
                    .input("created_at", user.createdAt.value)
                    .query(query);
            }
            catch (error) {
                if (error.code === "EREQUEST" && error.message.includes("Violation of UNIQUE KEY constraint")) {
                    throw new UserAlreadyExistsError_1.UserAlreadyExistsError("El correo ya está registrado.");
                }
                throw error;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.request().query("SELECT * FROM [user]");
            return result.recordset.map((row) => this.mapToDomain(row));
        });
    }
    getOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool
                .request()
                .input("id", id.value)
                .query("SELECT * FROM [user] WHERE id = @id");
            if (result.recordset.length === 0) {
                return null;
            }
            return this.mapToDomain(result.recordset[0]);
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool
                .request()
                .input("email", email)
                .query("SELECT * FROM [user] WHERE email = @email");
            if (result.recordset.length === 0) {
                return null;
            }
            return this.mapToDomain(result.recordset[0]);
        });
    }
    edit(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            UPDATE [user]
            SET name = @name, last_name = @last_name, role = @role, email = @email, password = @password
            WHERE id = @id
        `;
            yield this.pool
                .request()
                .input("name", user.name.value)
                .input("last_name", user.lastName.value)
                .input("role", user.role.value.name)
                .input("email", user.email.value)
                .input("password", user.password.value)
                .input("id", user.id.value)
                .query(query);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "DELETE FROM [user] WHERE id = @id";
            yield this.pool.request().input("id", id.value).query(query);
        });
    }
    mapToDomain(user) {
        return new User_1.User(new UserId_1.UserId(user.id), new UserName_1.UserName(user.name), new UserLastName_1.UserLastName(user.last_name), new UserRole_1.UserRole(user.role, this.roleRepository), new UserEmail_1.UserEmail(user.email), new UserPassword_1.UserPassword(user.password, true), new UserCreatedAt_1.UserCreatedAt(user.created_at));
    }
}
exports.SqlServerUserRepository = SqlServerUserRepository;
//# sourceMappingURL=SqlServerUserRepository.js.map