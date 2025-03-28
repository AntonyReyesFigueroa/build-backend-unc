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
exports.ExpressUserController = void 0;
const UserServiceContainer_1 = require("../../../Shared/Infrastructure/UserServiceContainer");
const UserNotFoundError_1 = require("../../Domain/Exceptions/UserNotFoundError");
const UserAlreadyExistsError_1 = require("../../Domain/Exceptions/UserAlreadyExistsError");
class ExpressUserController {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, email, password, role, name, lastName } = req.body;
                yield UserServiceContainer_1.ServiceContainer.user.create.run(id, email, password, role, name, lastName);
                res.status(201).json({ message: "Usuario registrado exitosamente." });
            }
            catch (error) {
                if (error instanceof UserAlreadyExistsError_1.UserAlreadyExistsError) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    next(error);
                }
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield UserServiceContainer_1.ServiceContainer.user.login.run(email, password);
                res.status(200).json(result);
            }
            catch (error) {
                next(error); // Pasar el error al middleware global
            }
        });
    }
    editPut(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, lastName, email, password, role } = req.body;
                yield UserServiceContainer_1.ServiceContainer.user.edit.run(id, name, lastName, email, password, role);
                res.status(200).json({ message: "Usuario actualizado exitosamente." });
            }
            catch (error) {
                if (error instanceof UserNotFoundError_1.UserNotFoundError) {
                    res.status(404).json({ error: error.message });
                }
                else {
                    next(error);
                }
            }
        });
    }
    editPatch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Obtener los campos proporcionados por el cliente
                const updates = req.body;
                // Aplicar solo los campos proporcionados
                yield UserServiceContainer_1.ServiceContainer.user.partialEdit.run(id, updates);
                res.status(200).json({ message: "Usuario actualizado parcialmente." });
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield UserServiceContainer_1.ServiceContainer.user.delete.run(id);
                res.status(200).json({ message: "Usuario eliminado exitosamente." });
            }
            catch (error) {
                if (error instanceof UserNotFoundError_1.UserNotFoundError) {
                    res.status(404).json({ message: error.message });
                }
                else {
                    next(error);
                }
            }
        });
    }
    getAll(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserServiceContainer_1.ServiceContainer.user.getAll.run();
                res.status(200).json(users);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getOneById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield UserServiceContainer_1.ServiceContainer.user.getOneById.run(id);
                res.status(200).json(user);
            }
            catch (error) {
                if (error instanceof UserNotFoundError_1.UserNotFoundError) {
                    res.status(404).json({ error: error.message });
                }
                else {
                    next(error);
                }
            }
        });
    }
    logout(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = UserServiceContainer_1.ServiceContainer.user.logout.run();
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllRoles(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield UserServiceContainer_1.ServiceContainer.role.getAll.run();
                res.status(200).json(roles);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ExpressUserController = ExpressUserController;
//# sourceMappingURL=ExpressUserController.js.map