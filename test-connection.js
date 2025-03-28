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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = __importDefault(require("mssql"));
const env_1 = require("./src/Shared/Infrastructure/env");
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    const dbConfig = {
        user: env_1.env.DB_USERNAME,
        password: env_1.env.DB_PASSWORD,
        server: env_1.env.DB_HOST,
        port: env_1.env.DB_PORT,
        database: env_1.env.DB_NAME,
        options: {
            encrypt: false, // Desactivar si no es Azure
            trustServerCertificate: true,
        },
    };
    console.log("🔧 Configuración de la base de datos:");
    console.log(`  - Host: ${dbConfig.server}`);
    console.log(`  - Port: ${dbConfig.port}`);
    console.log(`  - Username: ${dbConfig.user}`);
    console.log(`  - Database: ${dbConfig.database}`);
    try {
        const pool = yield mssql_1.default.connect(dbConfig);
        console.log("🟢 Conexión exitosa a la base de datos.");
        yield pool.close();
    }
    catch (error) {
        console.error("❌ Error al conectar a la base de datos:");
        console.error(`🔴 Código: ${error.code || "UNKNOWN"}`);
        console.error(`🔴 Mensaje: ${error.message}`);
    }
});
testConnection();
// npx ts-node test-connection.ts
//# sourceMappingURL=test-connection.js.map