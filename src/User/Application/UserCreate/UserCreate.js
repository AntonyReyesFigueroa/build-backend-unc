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
exports.UserCreate = void 0;
const User_1 = require("../../Domain/User");
const UserId_1 = require("../../Domain/UserId");
const UserName_1 = require("../../Domain/UserName");
const UserLastName_1 = require("../../Domain/UserLastName");
const UserEmail_1 = require("../../Domain/UserEmail");
const UserPassword_1 = require("../../Domain/UserPassword");
const UserCreatedAt_1 = require("../../Domain/UserCreatedAt");
const UserAlreadyExistsError_1 = require("../../Domain/Exceptions/UserAlreadyExistsError");
const UserRole_1 = require("../../Domain/UserRole");
const InMemoryUserRoleRepository_1 = require("../../Infrastructure/Persistence/InMemoryUserRoleRepository");
class UserCreate {
    constructor(repository) {
        this.repository = repository;
        this.roleRepository = new InMemoryUserRoleRepository_1.InMemoryUserRoleRepository();
    }
    run(id, email, password, role, name, // Campo opcional
    lastName // Campo opcional
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar si el usuario ya existe por ID o correo electrónico
            const existingUserId = yield this.repository.getOneById(new UserId_1.UserId(id));
            const existingUser = yield this.repository.getByEmail(email);
            if (existingUserId) {
                throw new UserAlreadyExistsError_1.UserAlreadyExistsError("El id ya está registrado.");
            }
            if (existingUser) {
                throw new UserAlreadyExistsError_1.UserAlreadyExistsError("El correo ya está registrado.");
            }
            // Validar el rol usando el repositorio
            const userRole = new UserRole_1.UserRole(role, this.roleRepository);
            // Normalizar `name` y `lastName`
            const normalizedFirstName = this.normalizeName(name);
            const normalizedLastName = this.normalizeName(lastName);
            // Crear el usuario
            const user = new User_1.User(new UserId_1.UserId(id), new UserName_1.UserName(normalizedFirstName), // Usar el nombre normalizado
            new UserLastName_1.UserLastName(normalizedLastName), // Usar el apellido normalizado
            userRole, new UserEmail_1.UserEmail(email), new UserPassword_1.UserPassword(password), new UserCreatedAt_1.UserCreatedAt());
            // Guardar en el repositorio
            yield this.repository.create(user);
        });
    }
    /**
     * Función para normalizar un nombre o apellido.
     * Convierte la primera letra en mayúscula y el resto en minúsculas.
     */
    normalizeName(name) {
        if (!name || name.trim() === "") {
            return "   "; // Valor predeterminado si no se proporciona un nombre
        }
        // Eliminar espacios innecesarios y dividir en palabras
        const words = name.trim().split(/\s+/);
        // Normalizar cada palabra
        const normalizedWords = words.map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
        // Unir las palabras normalizadas
        return normalizedWords.join(" ");
    }
}
exports.UserCreate = UserCreate;
//# sourceMappingURL=UserCreate.js.map