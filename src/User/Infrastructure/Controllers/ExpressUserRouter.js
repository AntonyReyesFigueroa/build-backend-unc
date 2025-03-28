"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressUserRouter = void 0;
const express_1 = require("express");
const ExpressUserController_1 = require("./ExpressUserController");
const controller = new ExpressUserController_1.ExpressUserController();
const ExpressUserRouter = (0, express_1.Router)();
exports.ExpressUserRouter = ExpressUserRouter;
// Rutas para usuarios
ExpressUserRouter.post("/api/user/register/", controller.register);
ExpressUserRouter.post("/api/user/login/", controller.login);
ExpressUserRouter.post("/api/user/logout/", controller.logout);
ExpressUserRouter.get("/api/users/", controller.getAll);
ExpressUserRouter.get("/api/users/:id/", controller.getOneById);
ExpressUserRouter.put("/api/users/:id/", controller.editPut);
ExpressUserRouter.patch("/api/users/:id/", controller.editPatch);
ExpressUserRouter.delete("/api/users/:id/", controller.delete);
ExpressUserRouter.get("/api/roles", controller.getAllRoles);
//# sourceMappingURL=ExpressUserRouter.js.map